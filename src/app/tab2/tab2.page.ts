import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  AlertController, ModalController, 
  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, 
  IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon, IonText, IonListHeader 
} from '@ionic/angular';

import { Http } from '@capacitor-community/http';
import { addIcons } from 'ionicons';
import { trashOutline, cashOutline, addCircleOutline } from 'ionicons/icons';
import { ModalPage } from '../modal/modal.page'; 


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, 
    IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon, IonText, IonListHeader
  ]
})
export class Tab2Page  {
  searchQuery: string = '';
  searchResults: any[] = [];
  savedDestinations: any[] = [];
  
  
  private API_KEY = 'a898e00b60c846208ece5584856f92e4'; 
  private debounceTimer: any;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    addIcons({ trashOutline, cashOutline, addCircleOutline });
  }

  ngOnInit() {
   
  }
  ionViewWillEnter() {
    this.loadFromStorage();
  }
  // Esta función se activa cuando escribes en la barra
  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
    clearTimeout(this.debounceTimer);
    
    if (this.searchQuery.trim().length < 3) {
      this.searchResults = [];
      return;
    }

    this.debounceTimer = setTimeout(() => {
      this.searchPlaces(this.searchQuery);
    }, 500); // Espera medio segundo para no saturar la API
  }

  // Aquí se conecta con OpenTripMap
  async searchPlaces(query: string) {
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=10&lang=es&apiKey=${this.API_KEY}`;
    try {
      const response = await Http.get({ url: url });
      if (response.data && response.data.features) {
        this.searchResults = response.data.features.map((feature: any) => ({
          xid: feature.properties.xid,
          name: feature.properties.name || 'Sin nombre',
          country: feature.properties.country || 'País desconocido',
          image: feature.properties.preview?.source || 'assets/placeholder.png' 
        }));
      }
    } catch (error) {
      console.error('Error buscando lugares:', error);
    }
  }

  // Agregar a la lista de deseados
  addToWishlist(place: any) {
    const exists = this.savedDestinations.find(d => d.xid === place.xid);
    if (exists) return;

    const newDest = {
      xid: place.xid,
      name: place.name,
      country: place.country,
      image: place.image !== 'assets/placeholder.png' ? 
      place.image : 'https://ionicframework.com/docs/img/demos/thumbnail.svg', 
      price: 0 
    };
    
    this.savedDestinations.push(newDest);
    this.saveToStorage();
    this.searchResults = []; 
    this.searchQuery = '';
  }

  saveToStorage() {
    localStorage.setItem('destinos_guardados', JSON.stringify(this.savedDestinations));
  }

  loadFromStorage() {
    const data = localStorage.getItem('destinos_guardados');
    if (data) {
      this.savedDestinations = JSON.parse(data);
    } else {
      this.savedDestinations = [];
    }
  }

  async deleteDestination(dest: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar este destino?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Eliminar', 
          handler: () => {
            this.savedDestinations = this.savedDestinations.filter(d => d.xid !== dest.xid);
            this.saveToStorage();
          }
        }
      ]
    });
    await alert.present();
  }

  // Abrir modal para el precio
  async openPriceModal(dest: any) {
    // Si tienes el ModalPage creado, puedes usar modalCtrl.
    // Mientras tanto, usamos un Alert simple:
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        destino: dest // Le pasamos los datos (nombre, país, precio actual)
      }
    });

    // 2. Lo mostramos
    await modal.present();

    // 3. ESCUCHAMOS CUANDO SE CIERRA (onDidDismiss)
    const { data, role } = await modal.onDidDismiss();

    // 4. Si el usuario hizo clic en "CONFIRMAR" y mandó un dato
    if (role === 'confirm' && data !== null) {
      // Actualizamos el precio del destino
      dest.price = data; 
      
      // Guardamos en localStorage
      this.saveToStorage();
      
      console.log('Precio actualizado a:', dest.price);
    }
  }
   
  
}
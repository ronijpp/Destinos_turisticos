import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlertController, ModalController, IonHeader, IonToolbar, 
  IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonThumbnail, 
  IonLabel, IonButton, IonIcon, IonText, IonListHeader } from '@ionic/angular';
import { Http } from '@capacitor-community/http';
import { addIcons } from 'ionicons';
import { trashOutline, cashOutline, addCircleOutline, searchOutline } from 'ionicons/icons';
import { PriceModalComponent} from '../precio-modal/precio-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, 
    IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonThumbnail, 
    IonLabel, IonButton, IonIcon, IonText, IonListHeader]
})
export class HomePage implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = []; // Usamos any[] para evitar conflictos con la interfaz
  savedDestinations: any[] = [];

  private API_KEY = 'a898e00b60c846208ece5584856f92e4'; 
  
  // El timer del debounce debe ser de tipo 'any' o 'number', NO del tipo 'destino'
  private debounceTimer: any; 

  constructor(  
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ){
    addIcons({ trashOutline, cashOutline, addCircleOutline, searchOutline });
  }

  ngOnInit() {
    this.loadFromStorage();
  }

  // --- 1. LÓGICA DE BÚSQUEDA ---
  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
    
    // Debounce para evitar llamadas innecesarias a la API
    clearTimeout(this.debounceTimer);
    
    if (this.searchQuery.trim().length < 3) {
      this.searchResults = [];
      return;
    }

    this.debounceTimer = setTimeout(() => {
      this.searchPlaces(this.searchQuery);
    }, 500);
  }

  async searchPlaces(query: string) {
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=10&lang=es&apiKey=${this.API_KEY}`;

     console.log("1. Consultando URL:", url); 

    try {
      const response = await Http.get({ url: url });
      
      console.log("2. Respuesta de Geoapify:", response.data);

      if (response.data && response.data.features) {

        this.searchResults = response.data.features.map((feature: any) => ({
          xid: feature.properties.place_id,
          name: feature.properties.name || 'Sin nombre',
          country: feature.properties.country || feature.properties.address_line1 || 'País desconocido',
          image: 'assets/placeholder.png' 
        }));

        console.log("3. Lista lista para mostrar:", this.searchResults);
      } else {
        console.warn("No se encontraron resultados o la estructura cambió.");
      }
     
    } catch (error) {
      console.error('Error buscando lugares:', error);
    } 
  }

  // --- 2. AGREGAR A LA LISTA ---
  addToWishlist(place: any, price: number) {

    const exists = this.savedDestinations.find(d => d.xid === place.xid);
    if (exists) return;

    const newDest = {
      xid: place.xid,
      name: place.name,
      country: place.country,
      image: place.image,
      price: 0
    };
    
    this.savedDestinations.push(newDest);
    this.saveToStorage();
    this.searchQuery = '';
  }

  // --- 3. PERSISTENCIA (MEMORIA) ---
  saveToStorage() {
    localStorage.setItem('destinos_guardados', JSON.stringify(this.savedDestinations));
  }

  loadFromStorage() {
    const data = localStorage.getItem('destinos_guardados');
    if (data) {
      this.savedDestinations = JSON.parse(data);
    }
  }

  // --- 4. ELIMINAR DESTINO ---
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

  // --- 5. MODAL PARA EDITAR PRECIO (Figura 2) ---
  async openPriceModal(dest: any) {
    const modal = await this.modalCtrl.create({
      component: PriceModalComponent,

    });
    await modal.present();
  
  const { data, role } = await modal.onDidDismiss();

    // 4. Si el usuario hizo clic en "Confirmar" (y escribió un número)
    if (role === 'confirm' && data !== null) {
      dest.price = parseFloat(data); // Actualizamos el precio
      this.saveToStorage();
    }
  }
}


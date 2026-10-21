import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonItem, IonThumbnail} from "@ionic/angular";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonText } from '@ionic/angular';
import { IonList, IonListHeader, IonIcon, IonLabel } from "@ionic/angular";


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon, IonListHeader, IonList, CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonButtons, IonButton, IonText, IonItem, IonThumbnail]
})
export class Tab3Page {
  
  totalPrecio: number = 0;
  savedDestinations: any[] = []; 

  ionViewWillEnter() {
    // Cada vez que entres a la pestaña 3, se calcula el total
    this.calcularTotalYLista();
  }

  // Función que lee los destinos guardados y suma sus precios
  calcularTotalYLista() {
    const data = localStorage.getItem('destinos_guardados');
    
    if (data) {
      this.savedDestinations = JSON.parse(data);
      
      // Usamos reduce para sumar la propiedad 'price' de cada destino
      this.totalPrecio = this.savedDestinations.reduce((suma: number, destino: any) => {
        return suma + (destino.price || 0); 
      }, 0);
    } else {
      this.savedDestinations = [];
      this.totalPrecio = 0;
    }
  }

  cancelar() {
    // Aquí puedes poner la lógica para borrar el carrito o regresar a la pestaña 1
    console.log('Cancelado');
  }

  confirmar() {
    // Aquí puedes poner la lógica para confirmar la compra
    console.log('Total confirmado:', this.totalPrecio);
  }
}

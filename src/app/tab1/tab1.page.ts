import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, 
  IonList, IonItem, IonThumbnail, IonLabel, IonButton, 
  IonIcon, IonText, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, cashOutline, cameraOutline, addCircleOutline } from 'ionicons/icons';
import { IonButtons } from "@ionic/angular";



export interface Destino { 
  nombre: string;
  pais: string;
  foto: string;
  precio?: number; 
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonButtons, CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, 
    IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon, IonText],
})

export class Tab1Page { 
    destinos: Destino[] = [
    { nombre: 'Playa Gemelas', pais: 'Costa Rica', foto: 'assets/playa gemelas.jpg', precio: 400.00 }, 
    { nombre: 'Montaña de Comayagua National Park', pais: 'Honduras', foto: 'assets/honduras.jpg', precio: 300.00 },
    { nombre: 'Pichilemu Historical Area', pais: 'Chile', foto: 'assets/chile.jpg', precio: 70.00 },
    { nombre: 'Holy Cross Church, Hanga', pais: 'Chile', foto: 'assets/holy chile.jpg', precio: 800.00},
    { nombre: 'Machupicchu', pais: 'Peru', foto: 'assets/machupicchu.jpg', precio: 500.00}
  ];

  constructor( private toastCtrl: ToastController) {
    addIcons({addCircleOutline,trashOutline,cameraOutline,cashOutline});
  }
  
  verDetalle(destino:Destino) {
      console.log('Ver detalle de:', destino.nombre);
  }

  cambiarFoto(destino: Destino) {
    console.log('Aquí irá la lógica de la cámara para:', destino.nombre);
  }

  eliminarDestino(index: number) {
    console.log('Eliminando destino...');
    this.destinos.splice(index, 1);
  }
 async agregarADeseados(destino: Destino) {
    // 1. Leer los que ya están guardados
    let guardados = JSON.parse(localStorage.getItem('destinos_guardados') || '[]');

    // 2. Verificar que no esté duplicado (usando el nombre como referencia)
    const existe = guardados.find((d: any) => d.name === destino.nombre);
    if (existe) {
      this.mostrarToast('Este destino ya está en tu lista');
      return;
    }

    // 3. Adaptar los datos al formato que usa el Tab 2
    const nuevoDestino = {
      xid: destino.nombre.replace(/\s+/g, '-').toLowerCase(), // Creamos un ID falso
      name: destino.nombre,
      country: destino.pais,
      image: destino.foto, // Aquí pasamos la ruta de tu imagen 'assets/...'
      price: destino.precio || 0
    };

    // 4. Guardar
    guardados.push(nuevoDestino);
    localStorage.setItem('destinos_guardados', JSON.stringify(guardados));
    this.mostrarToast('¡Agregado a Mis Destinos Deseados!');
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  } 


}

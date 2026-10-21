import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonHeader, IonToolbar, IonButtons, IonButton, 
  IonTitle, IonContent, IonItem, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-price-modal',
  templateUrl: './precio-modal.component.html',
  styleUrls: ['./precio-modal.component.scss'],
  standalone: true,
  // Importamos los módulos necesarios para que el HTML funcione
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonButtons, 
    IonButton, IonTitle, IonContent, IonItem, IonInput]
})
export class PriceModalComponent implements OnInit {
  
  // @Input() permite recibir datos desde la página principal (tab3 o home)
  @Input() currentPrice: number = 0; 
  
  // Esta es la variable que está conectada a tu [(ngModel)] en el HTML
  newPrice: number = 0; 

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Al abrir el modal, igualamos el nuevo precio al precio actual
    // para que el usuario vea lo que ya tenía escrito (ej. si era 400, verá 400)
    this.newPrice = this.currentPrice;
  }

  // Se ejecuta al hacer clic en "Cancelar"
  cancel() {
    // Cierra el modal y devuelve 'null' con el rol 'cancel'
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // Se ejecuta al hacer clic en "Confirmar"
  confirm() {
    // Cierra el modal, devuelve el nuevo precio escrito y el rol 'confirm'
    return this.modalCtrl.dismiss(this.newPrice, 'confirm');
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalController, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonInput, IonItem, IonLabel } from '@ionic/angular';
import { IonList, IonListHeader } from "@ionic/angular";
import { IonButtons } from "@ionic/angular";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
  standalone: true,
  imports: [IonButtons, IonListHeader, IonList, CommonModule, FormsModule, IonHeader, IonToolbar, 
    IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel]
})
export class ModalPage implements OnInit {
    valorViaje: number = 0;
  monedaSeleccionada: string = 'USD';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirmar() {
    this.modalCtrl.dismiss({ valor: this.valorViaje, moneda: this.monedaSeleccionada }, 'confirm');
  }

  
}

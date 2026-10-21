import { Component, OnInit } from '@angular/core';
import {DestinosService } from './services/destinos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonList, IonItem, IonSearchbar, IonThumbnail, 
  IonLabel, IonButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cashOutline, cameraOutline, trashOutline } from 'ionicons/icons';
import { IonSearchbar } from '@ionic/angular';

export interface Destino {
  id: number;
  nombre: string;
  pais: string;
  imagen: string;
  precio: number;
}

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.page.html',
  styleUrls: ['./destinos.page.scss'],
  standalone: true,

  imports: [CommonModule, 
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonSearchbar, IonThumbnail, 
    IonLabel, IonButton, IonIcon, IonSearchbar]
})
export class DestinosPage implements OnInit {

   destinos: Destino[] = [];

  constructor(private destinosService: DestinosService) {
    }
  addIcons({ cashOutline, cameraOutline, trashOutline });

  ngOnInit() {
    this.Destinos = this.tuServicio.cargarDestino();
  }

}

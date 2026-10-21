import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cashOutline, cameraOutline, trashOutline } from 'ionicons/icons';

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
  standalone: true,
  imports: [IonicModule, CommonModule] 
})

export interface destino {nombre: string;} 
destinos: destino[];

export class DestinosPage implements OnInit {


  constructor() {
    addIcons({ cashOutline, cameraOutline, trashOutline });
  }

  ngOnInit() {
    
    this.cargarDestinos();
  }
      
  }


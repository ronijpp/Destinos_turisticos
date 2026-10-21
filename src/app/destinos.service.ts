import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

 constructor() { }

   probarServicio() {
    console.log('Servicio de destinos funcionando perfectamente');
    return 'Hola desde el servicio';
}
}


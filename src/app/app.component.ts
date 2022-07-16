import { Component } from '@angular/core';
export interface TabItem {
  label: string;
  route: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oefa';
  tabs: TabItem[] = [
    {
      label: '¿Qúe es OEFA?',
      route: 'hero',
    },
    {
      label: 'Categorias',
      route: 'categories',
    },
    {
      label: 'Envio de Proformas',
      route: 'agreement',
    },
    {
      label: 'Iniciar Sesion',
      route: 'login',
    },
  ];
}

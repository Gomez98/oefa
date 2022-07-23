import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service'
export interface TabItem {
  label: string;
  route: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logged:boolean = false;

  constructor(private httpService: HttpService){}

  title = 'oefa';
  tabsWhenLogout: TabItem[] = [
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

  tabsWhenLogin: TabItem[] = [
    {
      label: 'Formularios enviados',
      route: 'sendedAgreements'
    },
    {
      label: 'Mantenimiento Productos',
      route: 'mgmtProducts'
    },
    {
      label: 'Mantenimiento Categorias ',
      route: 'mgmtCategories'
    }
  ]

  ngOnInit() {
    this.httpService.currentLoginStatusMessage.subscribe(msg => this.logged = msg); 
  }

}

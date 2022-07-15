import { Component, OnInit } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import { LoginComponent } from '../login/login.component';
export interface ExampleTab {
  label: string;
  content: string;
}
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  asyncTabs: Observable<ExampleTab[]>;

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: '¿Que es OEFA?', content: 'content1'},
          {label: 'Categorias', content: 'Content 2'},
          {label: 'Envio de Proformas', content: 'Content 3'},
          {label: 'Iniciar Sesion', content: LoginComponent},
        ]);
      }, 1000);
    });
  }

  ngOnInit(): void {
  }

}

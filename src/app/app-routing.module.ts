import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TabComponent } from './tab/tab.component';
import { HeroComponent } from './hero/hero.component';
import { AgreementComponent } from './agreement/agreement.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tab',
  },
  {
    path: 'tab',
    component: TabComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'hero',
    component: HeroComponent,
  },
  {
    path: 'agreement',
    component: AgreementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

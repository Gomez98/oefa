import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeroComponent } from './hero/hero.component';
import { AgreementComponent } from './agreement/agreement.component';
import { ManagementComponent } from './management/management.component';
import { SendagreementComponent } from './sendagreement/sendagreement.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'hero',
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
  {
    path: 'management',
    component: ManagementComponent,
  },
  {
    path: 'sendAgreement',
    component: SendagreementComponent,
  },
  {
    path: 'mgmtCategories',
    component: CategoryComponent,
  },
  {
    path: 'mgmtProducts',
    component: ProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

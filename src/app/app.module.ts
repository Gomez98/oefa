import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { HeroComponent } from './hero/hero.component';
import { AgreementComponent } from './agreement/agreement.component';
import { SendagreementComponent } from './sendagreement/sendagreement.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogEditCategoryComponent } from './dialog-edit-category/dialog-edit-category.component';
import { DialogEditProductComponent } from './dialog-edit-product/dialog-edit-product.component';
import { SendedAgrementsComponent } from './sended-agrements/sended-agrements.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeroComponent,
    AgreementComponent,
    SendagreementComponent,
    ProductComponent,
    CategoryComponent,
    DialogEditCategoryComponent,
    DialogEditProductComponent,
    SendedAgrementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

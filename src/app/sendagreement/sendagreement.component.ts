import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';


interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
}

interface Supplier {
  id: string;
  name: string;
  email: string;
  businessName: string;
  ruc: number;
  phone: number;
}



@Component({
  selector: 'app-sendagreement',
  templateUrl: './sendagreement.component.html',
  styleUrls: ['./sendagreement.component.css']
})
export class SendagreementComponent implements OnInit {


  catSelected: string;
  prodSelected: string;
  agreement: any;
  categories: Category[];
  products: Product[];


  supplierNameOptions: Supplier[] = [];
  nameFormControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  businessName?: string;
  companyEmail?: string;
  phone?: number;
  ruc?: number;

  /*
  businessNameFormControl = new FormControl('');
  rucFormControl = new FormControl('');
  companyEmailFormControl = new FormControl('');
  contactPhoneFormControl = new FormControl('');*/

  featureFormControl = new FormControl('');
  priceFormControl = new FormControl('');
  warrantyFormControl = new FormControl('');
  shippingFormControl = new FormControl('');
  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.businessName = '';
    this.companyEmail = '';
    this.httpService.getRequest('api/v1/supplier/list').subscribe((response) => {
      this.supplierNameOptions = response.data.suppliers.map((supplier: Supplier) => {
        return {
          id: supplier.id,
          name: supplier.name,
          email: supplier.email,
          phone: supplier.phone,
          businessName: supplier.businessName,
          ruc: supplier.ruc
        }
      });
    })

    this.httpService.getRequest('api/v1/category/list').subscribe((response) => {
      this.categories = response.data.categories.map((category: Category) => {
        return { id: category.id, name: category.name }
      });
    })


    this.httpService.getRequest('api/v1/product/list').subscribe((response) => {
      this.products = response.data.products.map((product: Product) => {
        return { id: product.id, name: product.name }
      });
    })

    this.filteredOptions = this.nameFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let supplier = this.supplierNameOptions.filter(sup => {
      return sup.name.toLowerCase().includes(filterValue)
    }).map(s => s.name);
    return supplier ? supplier : [];
  }

  clickName(supplierName: string): void {
    let supplier = this.supplierNameOptions.find(sup => sup.name == supplierName);
    this.businessName = supplier?.name;
    this.companyEmail = supplier?.email;
    this.ruc = supplier?.ruc;
    this.phone = supplier?.phone;
  }

  send(): void {
    let sup = this.supplierNameOptions.find(sup => sup.name == this.nameFormControl.value);
    let cat = this.categories.find(cat => cat.name == this.catSelected);
    let pro = this.products.find(prod => prod.name == this.prodSelected);
    this.agreement = {
      supplierId: sup?.id,
      categoryId: cat?.id,
      productId: pro?.id,
      features: this.featureFormControl.value,
      price: this.priceFormControl.value,
      warranty: this.warrantyFormControl.value,
      shippingTime: this.shippingFormControl.value,
    }
    this.httpService.postRequest('api/v1/agreement/save', this.agreement).subscribe((response) => {
      this.products = response.data.products;
    })
  }

}

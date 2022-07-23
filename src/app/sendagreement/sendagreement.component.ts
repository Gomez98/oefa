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
  categoryId: string;
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
  productOptions: any[];

  supplierNameOptions: Supplier[] = [];
  nameFormControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  businessName?: string;
  companyEmail?: string;
  phone?: number;
  ruc?: number;

  featureFormControl = new FormControl('');
  priceFormControl = new FormControl('');
  warrantyFormControl = new FormControl('');
  shippingFormControl = new FormControl('');
  businessNameFormControl = new FormControl('');
  rucFormControl = new FormControl('');
  companyEmailFormControl = new FormControl('');
  phoneFormControl = new FormControl('');
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
        return { id: product.id, name: product.name, categoryId: product.categoryId }
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
    console.log("sup", sup);
    let cat = this.categories.find(cat => cat.id == this.catSelected);
    let pro = this.products.find(prod => prod.id == this.prodSelected);

    if (!sup) {
      let supplier = {
        name: this.nameFormControl.value,
        ruc: this.rucFormControl.value,
        phone: this.phoneFormControl.value,
        businessName: this.businessNameFormControl.value,
        email: this.companyEmailFormControl.value,
      }
      console.log("supplier", supplier);
      this.httpService.postRequest('api/v1/supplier/save', supplier).subscribe((response) => {
        this.agreement = {
          supplierId: response.data.supplier.id,
          categoryId: cat?.id,
          productId: pro?.id,
          features: this.featureFormControl.value,
          price: this.priceFormControl.value,
          warranty: this.warrantyFormControl.value,
          shippingTime: this.shippingFormControl.value,
        };
        this.httpService.postRequest('api/v1/agreement/save', this.agreement).subscribe((response) => { })
      })

    } else {
      this.agreement = {
        supplierId: sup?.id,
        categoryId: cat?.id,
        productId: pro?.id,
        features: this.featureFormControl.value,
        price: this.priceFormControl.value,
        warranty: this.warrantyFormControl.value,
        shippingTime: this.shippingFormControl.value,
      }
      this.httpService.postRequest('api/v1/agreement/save', this.agreement).subscribe((response) => { })
    }
  }

  clickCategory(categoryId: string): void {
    let category = this.categories.find(c => c.id === categoryId);
    this.productOptions = this.products.filter(product => product.categoryId == category?.id).map(p => { return { id: p.id, name: p.name } })
  }
}

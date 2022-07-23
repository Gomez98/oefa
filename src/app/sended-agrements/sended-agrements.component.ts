import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogEditProductComponent } from '../dialog-edit-product/dialog-edit-product.component'



interface Agreement {
  id: string,
  businessName: string,
  categoryName: string,
  productName: string,
  features: string,
  price: number,
  shippingTime: number,
  selected: boolean,

  supplierId: string,
  categoryId: string,
  productId: string,
}

@Component({
  selector: 'app-sended-agrements',
  templateUrl: './sended-agrements.component.html',
  styleUrls: ['./sended-agrements.component.css']
})
export class SendedAgrementsComponent implements OnInit {

  catSelected: string;
  proSelected: string;

  categories: any[];
  products: any[];
  suppliers: any[];
  productOptions: any[];
  displayedColumns: string[] = ['id', 'businessName', 'categoryName', 'productName', 'features', 'price', 'shippingTime', 'selected'];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {

    this.httpService.getRequest('api/v1/category/list').subscribe((response) => {
      this.categories = response.data.categories.map((category: any) => {
        return { id: category.id, name: category.name }
      });
    })

    this.httpService.getRequest('api/v1/supplier/list').subscribe((response) => {
      this.suppliers = response.data.suppliers.map((supplier: any) => {
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

    this.httpService.getRequest('api/v1/product/list').subscribe((response) => {
      this.products = response.data.products.map((product: any) => {
        return { id: product.id, name: product.name, categoryId:product.categoryId }
      });
    })


    this.httpService.getRequest('api/v1/agreement/list').subscribe((response) => {
      this.dataSource.data = response.data.agreements.map((agreement: Agreement) => {
        let sup = this.suppliers.find(s => s.id == agreement.supplierId);
        let cat = this.categories.find(c => c.id == agreement.categoryId);
        let pro = this.products.find(p => p.id == agreement.productId);

        return {
          id: agreement.id,
          businessName: sup.businessName,
          categoryName: cat.name,
          productName: pro.name,
          features: agreement.features,
          price: agreement.price,
          shippingTime: agreement.shippingTime,
          selected: false
        }
      });
    })
  }

  inactiveAgreement(agreement: any): void {
    agreement.selected = false;

  }
  activeAgreement(agreement: any): void {
    agreement.selected = true;
  }

  generate(): void {
    let selectedAgreement = this.dataSource.data.filter(data => data.selected == true);
    if(selectedAgreement){

      selectedAgreement.forEach(ag => {
        let agreementTemplate = {
          supplierName: ag.businessName,
        }

        this.httpService.postRequest('api/v1/agreement/generate', ag.businessName).subscribe((response) => { })
      })
      
    }    

  }

  clickCategory(categoryId: string): void {
    let category = this.categories.find(c => c.id === categoryId);
    this.productOptions = this.products.filter(product => product.categoryId == category.id).map(p => { return { id: p.id, name: p.name } })
    this.dataSource.filter = category.name.trim().toLowerCase();
  }

  clickProduct(productId: string): void {
    let product = this.products.find(p => p.id === productId);
    this.dataSource.filter = product.name.trim().toLowerCase();
  }

}

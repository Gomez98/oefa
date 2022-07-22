import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogEditProductComponent } from '../dialog-edit-product/dialog-edit-product.component'


interface Product {
  id: string,
  name: string,
  category: string,
  categoryId: string,
  active: boolean
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  durationInSeconds = 5;
  catSelected: string;
  agreement: any;
  categories: any[];
  displayedColumns: string[] = ['id', 'category', 'name', 'status', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  productNameFormControl = new FormControl('');

  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.httpService.getRequest('api/v1/category/list').subscribe((response) => {
      this.categories = response.data.categories.map((category: any) => {
        return { id: category.id, name: category.name }
      });
    })

    this.httpService.getRequest('api/v1/product/list').subscribe((response) => {

      this.dataSource.data = response.data.products.map((product: any) => {
        let cat = this.categories.find(cat => cat.id == product.categoryId);

        return {
          id: product.id,
          name: product.name,
          category: cat?.name,
          categoryId: product.categoryId,
          active: product.active
        }
      });
    })
  }

  addProduct(): void {
    console.log(this.catSelected)
    let product = { name: this.productNameFormControl.value, categoryId: this.catSelected }
    this.httpService.postRequest('api/v1/product/save', product).subscribe((response) => {
      this.snackBar.open("Profucto creado", 'ok', {
        duration: this.durationInSeconds * 1000,
      }
      );
    })
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(DialogEditProductComponent, {
      width: '350px',
      data: {
        name: product.name,
        categoryId: product.categoryId,
        categories: this.categories
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result) {
        product = {
          ...product,
          ...result
        }
        this.httpService.postRequest('api/v1/product/update', product).subscribe((response) => { })
      }
    });
  }

  inactiveProduct(product: Product): void {
    product.active = false;
    this.httpService.postRequest('api/v1/product/save', product).subscribe((response) => { })
  }
  activeProduct(product: Product): void {
    product.active = true;
    this.httpService.postRequest('api/v1/product/save', product).subscribe((response) => { })
  }



}

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogEditCategoryComponent } from '../dialog-edit-category/dialog-edit-category.component'

interface Category {
  id: string,
  name: string,
  active: boolean
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  durationInSeconds = 5;
  displayedColumns: string[] = ['id', 'name', 'status', 'actions'];
  dataSource = new MatTableDataSource<Category>();
  categoryNameFormControl = new FormControl('');
  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.httpService.getRequest('api/v1/category/list').subscribe((response) => {
      this.dataSource.data = response.data.categories.map((category: Category) => {
        return {
          id: category.id,
          name: category.name,
          active: category.active
        }
      });
    })
  }

  addCategory(): void {
    let category = { name: this.categoryNameFormControl.value }
    this.httpService.postRequest('api/v1/category/save', category).subscribe((response) => {
      this.snackBar.open("Categoria creada", 'ok', {
        duration: this.durationInSeconds * 1000,
      }
      );
    })
  }

  openEditDialog(category: Category): void {
    const dialogRef = this.dialog.open(DialogEditCategoryComponent, {
      width: '350px',
      data: { name: category.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        category = {
          ...category,
          ...result
        }
        this.httpService.postRequest('api/v1/category/update', category).subscribe((response) => { })
      }
    });
  }

  inactiveCategory(category: Category): void {
    category.active = false;
    this.httpService.postRequest('api/v1/category/save', category).subscribe((response) => { })
  }
  activeCategory(category: Category): void {
    category.active = true;
    this.httpService.postRequest('api/v1/category/save', category).subscribe((response) => { })
  }


}

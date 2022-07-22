import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  categories: any[],
  categoryId: string;
}


@Component({
  selector: 'app-dialog-edit-product',
  templateUrl: './dialog-edit-product.component.html',
  styleUrls: ['./dialog-edit-product.component.css']
})
export class DialogEditProductComponent implements OnInit {

  catSelected: string;
  categories: any[];
  constructor(
    public dialogRef: MatDialogRef<DialogEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    let newData = {categoryId: this.data.categoryId, name: this.data.name}
    this.dialogRef.close(newData);
  }
  ngOnInit(): void {
    this.categories = this.data.categories;
    this.catSelected = this.data.categoryId;
    
  }

}

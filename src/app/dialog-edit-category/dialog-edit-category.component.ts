import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-dialog-edit-category',
  templateUrl: './dialog-edit-category.component.html',
  styleUrls: ['./dialog-edit-category.component.css']
})
export class DialogEditCategoryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-change-status',
  templateUrl: './dialog-change-status.component.html',
  styleUrls: ['./dialog-change-status.component.sass']
})
export class DialogChangeStatusComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogChangeStatusComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}



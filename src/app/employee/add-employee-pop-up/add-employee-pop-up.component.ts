import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-employee-pop-up',
  templateUrl: './add-employee-pop-up.component.html',
  styleUrls: ['./add-employee-pop-up.component.sass']
})
export class AddEmployeePopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEmployeePopUpComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }
  onNoClick(): void {
    this.dialogRef.close();
  }

}



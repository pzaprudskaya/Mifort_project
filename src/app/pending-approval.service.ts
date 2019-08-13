import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PendingApprovalService {


  constructor() { }

  valuesOfProgressCircle = [

    {
      datePeriod: '14 - 20 Apr',
      value: 39.25,
      max: 40.75,
      active: false
    },
    {
      datePeriod: '25 Mar - 1 Apr',
      value: 32.25,
      max: 40.75,
      active: false
    },
    {
      datePeriod: '14 - 20 Apr',
      value: 12.25,
      max: 40.75,
      active: false
    }
  ];

}

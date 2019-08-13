import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass'],

})
export class DatepickerComponent implements OnInit {
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  period: string;
  constructor() {
  }
  ngOnInit(): void {
    this.period = 'Select period';
  }

  inputEvent(event) {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const start = new Date(event.value);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(event.value);
    end.setDate(start.getDate() + 6);
    if (month[start.getMonth()] === month[end.getMonth()]) {
      this.period = start.getDate() + ' - ' + end.getDate() + ' ' + month[end.getMonth()];
    } else {
      this.period = start.getDate() + ' ' + month[start.getMonth()] + ' - ' + end.getDate() + ' ' + month[end.getMonth()];
    }
    this.change.emit(this.period);
  }

}


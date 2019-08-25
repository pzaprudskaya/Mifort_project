import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass'],

})
export class DatepickerComponent implements OnInit {
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  period: string;
  MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  constructor() {}
  ngOnInit(): void {
    this.period = 'Select period';
  }

  inputEvent(date): void {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    this.period = this.setDate(start, end);
    this.change.emit(this.period);
  }
  setDate(start, end) {
    if (this.MONTH[start.getMonth()] === this.MONTH[end.getMonth()]) {
      return `${start.getDate()} - ${end.getDate()} ${this.MONTH[end.getMonth()]}`;
    }
    return `${start.getDate()} ${this.MONTH[start.getMonth()]} - ${end.getDate()} ${this.MONTH[end.getMonth()]}`;
  }
}


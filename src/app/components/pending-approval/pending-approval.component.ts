import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'app-pending-approval',
  templateUrl: './pending-approval.component.html',
  styleUrls: ['./pending-approval.component.sass']
})
export class PendingApprovalComponent implements OnInit {
  @Input() value = [];
  ngOnInit() {

  }
  changeCircleActivity(circle) {
    circle.active = !circle.active;
  }
  checkValue(max: number, value: number): string{
    if(value / max * 100 < 60){
      return 'red';
    } else if(value / max * 100 < 85){
      return 'orange';
    } else {
      return 'green';
    }
  }
}

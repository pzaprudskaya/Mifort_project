import {Component, Input, OnInit} from '@angular/core';
import {CompanySettingsModel} from '../company-settings/company-settings.model';

@Component({
  selector: 'app-company-properties',
  templateUrl: './company-properties.component.html',
  styleUrls: ['./company-properties.component.sass']
})
export class CompanyPropertiesComponent implements OnInit {
  periods: string[];
  @Input() properties: CompanySettingsModel;
  ngOnInit() {
    this.periods = ['week', '2 week', 'month'];
  }


}

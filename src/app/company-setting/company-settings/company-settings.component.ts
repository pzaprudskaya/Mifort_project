import { Component, OnInit } from '@angular/core';
import {CompanySettingsService} from './company-settings.service';
import {CompanySettingsModel} from './company-settings.model';
import {UserService} from '../../core/logo-user-company/user.service';
import {User} from '../../core/logo-user-company/user.model';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.sass']
})
export class CompanySettingsComponent implements OnInit {
  user: User;
  companySettings: CompanySettingsModel;
  constructor(private companySettingsService: CompanySettingsService,
              private  userService: UserService ) {
  }
  ngOnInit(): void {
    this.userService.userCompany$.subscribe((name) => {
      this.companySettingsService.getCompany(name).
      subscribe( (company) => {
        this.companySettings = company[0];
      });
    });
  }
  save() {
    if (this.companySettingsService.companyName !== 'createCompany') {
      this.companySettingsService.updateCompany(this.companySettings);
    } else {
      this.user.companies.push(this.companySettings.name);
      this.userService.updateUser(this.user);
      this.companySettingsService.addCompany(this.companySettings);
    }
  }
}

import { Injectable } from '@angular/core';
import { PendingApprovalService } from '../../pending-approval.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeesTableService {
  employees = [
    {photo: '#0047FF', name: 'Anna', role: 'HR Manager', planned_actual: 'нужно сделать', pending_approval: this.pendingApprovalService.valuesOfProgressCircle},
    {photo: '#9E00FF', name: 'Katya', role: 'Admin', planned_actual: 'нужно сделать', pending_approval: this.pendingApprovalService.valuesOfProgressCircle },
    {photo: '#00C537', name: 'Masha', role: 'Owner', planned_actual: 'нужно сделать', pending_approval: this.pendingApprovalService.valuesOfProgressCircle },
  ];
  constructor(private pendingApprovalService: PendingApprovalService) { }

}

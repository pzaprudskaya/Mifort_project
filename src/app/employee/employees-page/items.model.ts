export interface Employees {
  id: number;
  photoUrl: string;
  name: string;
  role: string;
  planned: number;
  actual: number;
  status: string;
  pendingApprovalTimesheets:
    [
      {
        period: string,
        planned: number,
        actual: number
      }
      ];

}

export class User {
  id: number;
  photoUrl: string;
  name: string;
  role: string;
  email: string;
  planned: number;
  actual: number;
  status: string;
  pendingApprovalTimesheets:
    [
      {
        period: string,
        planned: number,
        actual: number
      }
      ];

  constructor(id: number, photoUrl: string, name: string, role: string, email: string, planned: number, actual: number,
              status: string, pendingApprovalTimesheets: [{ period: string; planned: number; actual: number }]) {
    this.id = id;
    this.photoUrl = photoUrl;
    this.name = name;
    this.role = role;
    this.email = email;
    this.planned = planned;
    this.actual = actual;
    this.status = status;
    this.pendingApprovalTimesheets = pendingApprovalTimesheets;
  }
}


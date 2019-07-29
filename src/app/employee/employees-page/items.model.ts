export interface Employees {
  photo: string;
  name: string;
  role: string;
  planned: number;
  actual: number;
  pendingApprovalTimesheets:
    [
      {
        from: string,
        to: string,
        planned: number,
        actual: number
      }
      ];

}

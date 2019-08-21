export interface Profile {
  photoUrl: string;
  name:	string;
  role:	string;
  workload: number;
  email: string;
  phone: string;
  employeeProjects:
    [
      {
        color: string;
        name: string;
        role: string;
        time: number;

      }
    ];
  yearsWorkload: [
    {
      month: string;
      projectsWorkload: [
        {
          color:	string;
          name:	string;
          workload:	number;
        }
        ]
    }
    ];
  timesheetsPendingApproval:
    [
      {
        period: string;
        logs: [{
          id: number;
          projectName: string;
          color: string;
          comment: string;
          time: number[];
        }]
        status: string;
      }
    ];

  notificationsSettings:
    [
      {
        key:	string;
        value: string;
      }
    ];
}

export class TimeSheetForApproval {
  period: string;
  logs: any[];
  timesheetWorkload: any[];
  constructor(period: string, logs: any[], timesheetWorkload: any[]) {
    this.period = period;
    this.logs = logs;
    this.timesheetWorkload = timesheetWorkload;
  }

}

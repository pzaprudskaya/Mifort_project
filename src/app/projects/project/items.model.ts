export interface Project {
  color: string;
  name: string;
  team:
    [
      {
        photo:	string,
        name:	string,
        workload:	number,
      }
    ];
  startDate:	string;
  endDate:	string;
  planned:	number;
  actual:	number;
  status: string;
}

export class ProjectModel {
  color: string;
  name: string;
  team:
    [
      {
        photo:	string,
        name:	string,
        workload:	number,
      }
      ];
  startDate:	string;
  endDate:	string;
  planned:	number;
  actual:	number;
  status: string;

  constructor(color: string, name: string,
              team: [{ photo: string; name: string; workload: number }],
              startDate: string, endDate: string, planned: number, actual: number, status: string) {
    this.color = color;
    this.name = name;
    this.team = team;
    this.startDate = startDate;
    this.endDate = endDate;
    this.planned = planned;
    this.actual = actual;
    this.status = status;
  }
}

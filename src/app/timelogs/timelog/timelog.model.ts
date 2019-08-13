export interface TimelogModel {
  id: number;
  color: string;
  projectName: string;
  time: any[];
  comment: string;
}

export class Timelog {
  id: number;
  color: string;
  projectName: string;
  time: any[];
  comment: string;
  constructor(id: number, color: string, projectName: string, time: any[], comment: string ) {
    this.id = id;
    this.color = color;
    this.projectName = projectName;
    this.time = time;
    this.comment = comment;
  }
}

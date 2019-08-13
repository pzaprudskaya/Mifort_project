export interface TimelogModel {
  color: string;
  projectName: string;
  time: number[];
  comment: string;
}

export class Timelog {
  color: string;
  projectName: string;
  time: number[];
  comment: string;
  constructor(color: string, projectName: string, time: number[], comment: string ) {
    this.color = color;
    this.projectName = projectName;
    this.time = time;
    this.comment = comment;
  }
}

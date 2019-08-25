export interface Approval {
  id: number;
  photoUrl: string;
  name: string;
  planned: number;
  actual: number;
  status: string;
  period: string;
  comment: string;
}
export class ApprovalModel {
  id: number;
  photoUrl: string;
  name: string;
  planned: number;
  actual: number;
  status: string;
  period: string;
  comment: string;

  constructor(id: number, photoUrl: string, name: string, planned: number, actual: number, status: string, period: string,
              comment: string) {
    this.id = id;
    this.photoUrl = photoUrl;
    this.name = name;
    this.planned = planned;
    this.actual = actual;
    this.status = status;
    this.period = period;
    this.comment = comment;
  }
}

export interface TimelogModel {
  name: string;
  data: [
    {
      period: string;
      logs: [
        {
          id: number;
          color: string;
          projectName: string;
          comment: string;
          time: number;
        }
        ];
    }
    ];
}

export class Timelog {
  name: string;
  data: [
    {
      period: string;
      logs: [
        {
          id: number;
          color: string;
          projectName: string;
          comment: string;
          time: number;
        }
        ];
    }
    ];

  constructor(name: string, data: [{ period: string; logs: [{ id: number; color: string; projectName: string;
      comment: string; time: number }] }]) {
    this.name = name;
    this.data = data;
  }
}

{

}

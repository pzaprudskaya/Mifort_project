export interface TimelogModel {
  name: string;
  data: [
    {
      day: string;
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
      day: string;
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

  constructor(name: string, data: [{ day: string; logs: [{ id: number; color: string; projectName: string;
      comment: string; time: number }] }]) {
    this.name = name;
    this.data = data;
  }
}

export class Donut {
  name: string;
  color: string;
  actual: number;
  planned: number;

  constructor(name: string, color: string, actual: number, planned: number) {
    this.name = name;
    this.color = color;
    this.actual = actual;
    this.planned = planned;
  }
}

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
          time: number[];
        }
      ];
      status: string;
      comment: string;
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
          time: number[];
        }
        ];
      status: string;
      comment: string;
    }
    ];


  constructor(name: string, data: [{ period: string; logs: [{ id: number; color: string; projectName: string;
  comment: string; time: number[] }]; status: string; comment: string }]) {
    this.name = name;
    this.data = data;
  }
}

export class Donut {
  name: string;
  color: string;
  actual: number;

  constructor(name: string, color: string, actual: number) {
    this.name = name;
    this.color = color;
    this.actual = actual;
  }
}

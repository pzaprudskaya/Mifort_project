
export class BarChartModel {
  label:	string;
  backgroundColor:	string;
  data: number[];
  borderWidth: number;

  constructor(label: string, backgroundColor: string, data: number[], borderWidth: number) {
    this.label = label;
    this.backgroundColor = backgroundColor;
    this.data = data;
    this.borderWidth = borderWidth;
  }
}

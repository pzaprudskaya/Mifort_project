import { Component, OnInit, Input, Output } from '@angular/core';
import { Chart } from 'chart.js';
import { BarChartModel } from './bar-chart.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.sass']
})
export class BarChartComponent implements OnInit {
  @Input() bar;
  barChart: any;
  monthlyLabels: string[];
  monthlyData: BarChartModel[];
  label: string;
  data: number[];
  backgroundColor: string;
  borderWidth: number;
  countProject: number;


  constructor(public router: Router) {

  }

  ngOnInit() {
    this.barChart = [];
    this.monthlyLabels = [];
    this.monthlyData = [];
    this.label = '';
    this.data = [];
    this.backgroundColor = '';
    this.borderWidth = 0;
    this.countProject = 0;
    this.bar.forEach((item) => {
      this.monthlyLabels.push(item.month);
      this.countProject = 0;
      item.projectsWorkload.forEach(() => {
        this.countProject += 1;
      });
    });
    for (let i = 0; i < this.countProject; i++) {
      this.bar.forEach((item) => {
        item.projectsWorkload.forEach((project) => {
          if (project.name === item.projectsWorkload[i].name) {
            this.label = project.name;
            this.backgroundColor = project.color;
            this.borderWidth = 1;

            this.data.push(project.workload);


          }
        });
      });
      const myBar = new BarChartModel(this.label, this.backgroundColor, this.data, this.borderWidth);
      this.monthlyData.push(myBar);


      this.data = [];
    }
    console.log(this.monthlyData);
    const data = {
      labels: this.monthlyLabels,
      datasets: this.monthlyData,
    };
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data,
      options: {
        title: {
          display: true,
          text: 'Hours',
          position: 'left',
        },


        onClick: this.routingFunction.bind(this),
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines : {
              display : false
            },
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        },
      }
    });

  }



  routingFunction(evt, item) {
    const activePoint = this.barChart.getElementsAtEvent(evt);
   /* var elementIndex = active[0]._datasetIndex;

    var chartData = item[elementIndex]['_chart'].config.data;
    var idx = item[elementIndex]['_index'];

    var label = chartData.labels[idx];
    var value = chartData.datasets[elementIndex].data[idx];
    var series = chartData.datasets[elementIndex].label;
    */
    const data = activePoint._chart.config.data;
    const datasetIndex = activePoint._datasetIndex;
    const label = data.datasets[datasetIndex].label;
    const value = data.datasets[datasetIndex].data[activePoint._index];
    const series = data.datasets[datasetIndex].label;
    console.log(datasetIndex);
    console.log(label);
    console.log(value);
    console.log(series);
    // this.router.navigate(["/projects/" + series]);

  }
}

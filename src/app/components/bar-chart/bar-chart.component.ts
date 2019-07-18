import { Component, OnInit, Input, Output } from '@angular/core';
import { Chart } from 'chart.js';
import { chartDate } from './chartData';
import { labels } from './chartData';
import {Router} from "@angular/router";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.sass']
})
export class BarChartComponent implements OnInit {
  @Output() barSelect;
  @Output() barItemSelect;
  barChart: any = [];
  constructor(public router: Router){}

  ngOnInit(){
    chartDate.forEach((item) => {
      item
    });

    let data = {
      labels: labels,
      datasets: chartDate,
    }
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: data,
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
    var activePoint = this.barChart.getElementsAtEvent(evt);
   /* var elementIndex = active[0]._datasetIndex;

    var chartData = item[elementIndex]['_chart'].config.data;
    var idx = item[elementIndex]['_index'];

    var label = chartData.labels[idx];
    var value = chartData.datasets[elementIndex].data[idx];
    var series = chartData.datasets[elementIndex].label;
    */
    var data = activePoint['_chart'].config.data;;
    var datasetIndex = activePoint._datasetIndex;
    var label = data.datasets[datasetIndex].label;
    var value = data.datasets[datasetIndex].data[activePoint._index];
    var series = data.datasets[datasetIndex].label;
    console.log(datasetIndex);
    console.log(label);
    console.log(value);
    console.log(series);
    //this.router.navigate(["/projects/" + series]);

  }
}

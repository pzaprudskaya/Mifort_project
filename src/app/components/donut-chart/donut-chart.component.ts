import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

import {Router} from '@angular/router';


@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.sass']
})
export class DonutChartComponent implements OnInit {
  @Input() dataDonutChart: any[];
  DoughnutChart;
  realResult: number;
  expectedResult: number;
  h = '';

  constructor(public router: Router) {}
  ngOnInit() {
    const data = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        borderWidth: 0,
      }]
    };

    this.dataDonutChart.forEach((item) => {
      data.labels.push(item.name);
      data.datasets[0].backgroundColor.push(item.color);
      data.datasets[0].data.push(item.actual);
    });
    Chart.defaults.global.legend.labels.usePointStyle = true;
    this.DoughnutChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data,
      options: {
        events: ['click'],
        onClick: this.routingFunction.bind(this),
        cutoutPercentage: 90,
        legend: {
          position: 'right',
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        }

      }
    });
    debugger;
  /*  const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
    Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
      draw() {
        originalDoughnutDraw.apply(this, arguments);

        const chart = this.chart;
        const width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

        const fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + 'em sans-serif';
        this.realResult = 10;
        this.expectedResult = 20;
        this.h = '';
        const sum =  this.realResult + '/' + this.expectedResult + this.h;
        let text = sum, textX, textY;
        textX = height / 2;
        textY = height / 2;
        ctx.fillText(text, textX, textY);
      }
    });
    */
  }
  routingFunction(evt) {
    const activePoints = this.DoughnutChart.getElementsAtEvent(evt);
    if (activePoints[0]) {
      const chartData = activePoints[0]._chart.config.data;
      const idx = activePoints[0]._index;
      const label = chartData.labels[idx];

      this.router.navigate(['/projects/' + label]);

    }
  }
}

import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import moment from 'moment';

@Component({
  selector: 'iapp-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements AfterViewInit {

  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  barChart: any;
  tmpChartElement: any;
  data: any;

  days: any[] = [];
  backgroundColors: any[] = [];

  mockUpChart = [
    {
      isCompressed: true,
      dataShape: {
        fieldDefinitions: {
          date: {
            name: "date",
            description: "date",
            baseType: "STRING",
            ordinal: 0,
            alias: "_0",
            aspects: {},
          },
          start: {
            name: "start",
            description: "start",
            baseType: "STRING",
            ordinal: 1,
            alias: "_1",
            aspects: {},
          },
          end: {
            name: "end",
            description: "end",
            baseType: "STRING",
            ordinal: 2,
            alias: "_2",
            aspects: {},
          },
          run: {
            name: "run",
            description: "run",
            baseType: "STRING",
            ordinal: 3,
            alias: "_3",
            aspects: {},
          },
          method: {
            name: "method",
            description: "method",
            baseType: "STRING",
            ordinal: 4,
            alias: "_4",
            aspects: {},
          },
          instrumentstate: {
            name: "instrumentstate",
            description: "instrumentstate",
            baseType: "STRING",
            ordinal: 5,
            alias: "_5",
            aspects: {},
          },
        },
      },
      rows: [
        {
          _0: "2023-02-24",
          _1: "00:22",
          _2: "00:45",
          _3: "",
          _4: "",
          _5: "start",
        },
        {
          _0: "2023-02-25",
          _1: "05:53",
          _2: "06:44",
          _3: "",
          _4: "",
          _5: "idle",
        },
        {
          _0: "2023-02-26",
          _1: "06:55",
          _2: "07:25",
          _3: "",
          _4: "",
          _5: "idle",
        },
        {
          _0: "2023-02-26",
          _1: "09:23",
          _2: "09:55",
          _3: "",
          _4: "",
          _5: "running",
        },
        {
          _0: "2023-02-26",
          _1: "11:43",
          _2: "11:59",
          _3: "",
          _4: "",
          _5: "pause",
        },
        {
          _0: "2023-02-26",
          _1: "15:45",
          _2: "16:42",
          _3: "",
          _4: "",
          _5: "idle",
        },
        {
          _0: "2023-02-26",
          _1: "02:23",
          _2: "03:25",
          _3: "test_run",
          _4: "",
          _5: "idle",
        },
        {
          _0: "2023-02-26",
          _1: "03:45",
          _2: "04:55",
          _3: "test_run",
          _4: "unknown",
          _5: "running",
        },
        {
          _0: "2023-02-27",
          _1: "11:45",
          _2: "12:15",
          _3: "",
          _4: "",
          _5: "start",
        },
        {
          _0: "2023-02-28",
          _1: "15:44",
          _2: "18:20",
          _3: "",
          _4: "",
          _5: "",
        },
        {
          _0: "2023-03-01",
          _1: "11:02",
          _2: "12:33",
          _3: "",
          _4: "",
          _5: "idle",
        },
        {
          _0: "2023-03-02",
          _1: "18:22",
          _2: "19:21",
          _3: "",
          _4: "",
          _5: "running",
        },
      ],
    },
  ];


  constructor() { }

  ngAfterViewInit() {

    this.barChartMethod();
  }

  barChartTemp() {
    this.mockUpChart.forEach(element => {
      if (element.rows != undefined && element.rows != null) {
        this.tmpChartElement = element.rows != undefined ? element.rows : '';
      }
    });
    this.tmpChartElement.forEach((el: any) => {
      if (el._0 != undefined && el._0 != null) {
        if (!this.days.includes(el._0)) {
          this.days.push(el._0);
        }
      }

      if (el._5 != undefined && el._5 != null) {
        switch (el._5) {
          case "idle":
            this.backgroundColors.push("rgb(255,255,102,0.4)"); //yellow
            break;
          case "start":
            this.backgroundColors.push("rgb(51,204,51,0.4)"); //green
            break;
          case "pause":
            this.backgroundColors.push("rgb(255,153,51,0.4)"); //orange
            break;
          case "running":
            this.backgroundColors.push("rgb(51,153,255,0.4)"); //blue
            break;
          case "":
            this.backgroundColors.push("rgb(255,255,255,0)"); //white
            break;
          default:
            this.backgroundColors.push("rgb(255,255,255,0)"); //white
            break;
        }
      }
    });

    this.data = this.tmpChartElement.map((item: any) => ({
      x: item._0,
      y: [moment(`1970-02-01 ${item._1}`).valueOf(), moment(`1970-02-01 ${item._2}`).valueOf()]
    }));
  }

  barChartMethod() {
    this.barChartTemp();
    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Test',
          data: this.data,
          backgroundColor: this.backgroundColors
        }],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            //min: '2021-11-07',
          },
          y: {
            beginAtZero: false,
            ticks: {
              stepSize: 3.6e+6,
              callback: value => {
                let date = moment(value);
                if (date.diff(moment('1970-02-01 23:59:59'), 'minutes') === 0) {
                  return null;
                }

                return date.format('HH:mm');
              }
            }
          }
        }
      }
    });
  }
}

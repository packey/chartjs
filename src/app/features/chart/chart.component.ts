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
  tmpChartElement: any[] = [];
  data: any;

  chartYvalues: any[] = [];
  backgroundColors: any[] = [];

  allDaysTime =
    [
      {
        StartTime: "00:00",
        EndTime: "01:00",
      },
      {
        StartTime: "01:00",
        EndTime: "02:00",
      },
      {
        StartTime: "02:00",
        EndTime: "03:00",
      },
      {
        StartTime: "03:00",
        EndTime: "04:00",
      },
      {
        StartTime: "04:00",
        EndTime: "05:00",
      },
      {
        StartTime: "05:00",
        EndTime: "06:00",
      },
      {
        StartTime: "06:00",
        EndTime: "07:00",
      },
      {
        StartTime: "07:00",
        EndTime: "08:00",
      },
      {
        StartTime: "08:00",
        EndTime: "09:00",
      },
      {
        StartTime: "09:00",
        EndTime: "10:00",
      },
      {
        StartTime: "10:00",
        EndTime: "11:00",
      },
      {
        StartTime: "11:00",
        EndTime: "12:00",
      },
      {
        StartTime: "12:00",
        EndTime: "13:00",
      },
      {
        StartTime: "13:00",
        EndTime: "14:00",
      },
      {
        StartTime: "14:00",
        EndTime: "15:00",
      },
      {
        StartTime: "15:00",
        EndTime: "16:00",
      },
      {
        StartTime: "16:00",
        EndTime: "17:00",
      },
      {
        StartTime: "17:00",
        EndTime: "18:00",
      },
      {
        StartTime: "18:00",
        EndTime: "19:00",
      },
      {
        StartTime: "19:00",
        EndTime: "20:00",
      },
      {
        StartTime: "20:00",
        EndTime: "21:00",
      },
      {
        StartTime: "21:00",
        EndTime: "22:00",
      },
      {
        StartTime: "22:00",
        EndTime: "23:00",
      },
      {
        StartTime: "23:00",
        EndTime: "00:00",
      }
    ];


  mockUpChart = [
    {
      Date: "2023-01-01",
      Runs: {
        Name: "Run abc",
        StartTime: "2023-01-01 01:00",
        EndTime: "2023-01-01 05:00",
        Methods: [
          {
            Name: "",
            StartTime: "",
            EndTime: ""
          }
        ],
        Pauses: [
          {
            StartTime: "2023-01-01 01:00",
            EndTime: "2023-01-01 02:00",
          }
        ]
      }
    },
    {
      Date: "2023-01-02",
      Runs: {
        Name: "Run abc",
        StartTime: "2023-01-02 01:00",
        EndTime: "2023-01-02 05:00",
        Methods: [
          {
            Name: "",
            StartTime: "",
            EndTime: ""
          }
        ],
        Pauses: []
      }
    },
    {
      Date: "2023-01-03",
      Runs: []
    },
    {
      Date: "2023-01-04",
      Runs: {
        Name: "Run abc",
        StartTime: "2023-01-04 01:00",
        EndTime: "2023-01-04 05:00",
        Methods: [
          {
            Name: "",
            StartTime: "",
            EndTime: ""
          }
        ],
        Pauses: []
      }
    }

  ];


  constructor() { }

  ngAfterViewInit() {

    this.barChartMethod();
  }

  separateDate(date: string) {
    var a = date.split(" ");
    //var date = a[0];
    //var time = a[1];
    return a;
  }

  barChartTemp() {

    this.mockUpChart.forEach(element => {
      //da se popuni za svaki dan svi termini...
      this.allDaysTime.forEach(allDays => {
        console.log("allDays", allDays);
        var tmpDate = {
          date: element.Date,
          startTime: `${element.Date} ${allDays.StartTime}`,
          endTime: `${element.Date} ${allDays.EndTime}`,//`${element.Date} 01:00`
        }
        // var tmpRun1 = {
        //   date: element.Date,
        //   startTime: `${element.Date} 05:00`,
        //   endTime: `${element.Date} 06:00`
        // }
        //this.backgroundColors.push("rgb(255,255,255,0)"); //white
        this.backgroundColors.push("rgb(255,255,255,0)"); //white
        this.chartYvalues.push(tmpDate);
        //this.chartYvalues.push(tmpRun1);
        console.log("tmpDate", tmpDate);
      });
      // this.allDaysTime.forEach(allDays => {
      // var tmpRun = {
      //   date: element.Date,
      //   startTime: `${element.Date} 00:00`,
      //   endTime: `${element.Date} 01:00`
      // }
      // var tmpRun1 = {
      //   date: element.Date,
      //   startTime: `${element.Date} 05:00`,
      //   endTime: `${element.Date} 0:00`
      // }
      // this.backgroundColors.push("rgb(255,255,255,0)"); //white
      // this.backgroundColors.push("rgb(255,255,255,0)"); //white
      // this.chartYvalues.push(tmpRun);
      // this.chartYvalues.push(tmpRun1);
      // console.log("tmpDate", tmpRun);
      // });
      if (element.Runs != undefined && element.Runs != null) {
        //if (element.Runs != undefined && element.Runs['Pauses'] != null) {
        this.tmpChartElement.push(element.Runs);
        //}
      }
    });
    this.tmpChartElement.forEach((el: any) => {
      //da se spremi prvo deo koji se odnosi na Run za y osu
      if (el.StartTime != undefined && el.StartTime != null) {
        var tmpRun = {
          date: this.separateDate(el.StartTime)[0],
          startTime: el.StartTime,
          endTime: el.EndTime
        }
        this.chartYvalues.push(tmpRun);
        this.backgroundColors.push("rgb(51,204,51,0.4)"); //green
      } else {
        //this.allDaysTime.forEach(allDays => {
        // console.log("el", el);
        // var tmpDate = {
        //   date: el.Date,
        //   startTime: `${el.Date} 00:00`,
        //   endTime: `${el.Date} 01:00`
        // }
        // this.backgroundColors.push("rgb(255,255,255,0)"); //white
        // console.log("tmpDate", tmpDate);
        // this.chartYvalues.push(tmpDate);
        //});
        // var tmpDate = {
        //   date: el.Date,
        //   startTime: el.StartTime,
        //   endTime: el.EndTime
        // }
        // this.chartYvalues.push(tmpRun);
        // this.backgroundColors.push("rgb(51,204,51,0.4)"); //green
      }
      if (el.Pauses != undefined && el.Pauses != null) {
        if (el.Pauses.length > 0) {
          //ako postoje pauze da ih ubaci u niz gde treba da se prikazu rezultati po y osu - da prikaze i pauze
          el.Pauses.forEach((elPauses: any) => {
            if (elPauses.StartTime != undefined && elPauses.StartTime != null && elPauses.EndTime != undefined && elPauses.EndTime != null) {
              var tmpPauses = {
                date: this.separateDate(el.StartTime)[0],
                startTime: elPauses.StartTime,
                endTime: elPauses.EndTime
              }
              this.chartYvalues.push(tmpPauses);
              this.backgroundColors.push("rgb(255,255,102,1)"); //yellow
            }
          });
          //if (!this.pauses.includes(el._0)) {


          //}
        }
      }


      // if (el._5 != undefined && el._5 != null) {
      //   switch (el._5) {
      //     case "idle":
      //       this.backgroundColors.push("rgb(255,255,102,0.4)"); //yellow
      //       break;
      //     case "start":
      //       this.backgroundColors.push("rgb(51,204,51,0.4)"); //green
      //       break;
      //     case "pause":
      //       this.backgroundColors.push("rgb(255,153,51,0.4)"); //orange
      //       break;
      //     case "running":
      //       this.backgroundColors.push("rgb(51,153,255,0.4)"); //blue
      //       break;
      //     case "":
      //       this.backgroundColors.push("rgb(255,255,255,0)"); //white
      //       break;
      //     default:
      //       this.backgroundColors.push("rgb(255,255,255,0)"); //white
      //       break;
      //   }
      // }
    });
    console.log("Y values", this.chartYvalues);
    console.log("BackgroundColors", this.backgroundColors);

    this.data = this.chartYvalues.map((item: any) => ({
      x: item.date,
      y: [moment(`1970-02-01 ${this.separateDate(item.startTime)[1]}`).valueOf(), moment(`1970-02-01 ${this.separateDate(item.endTime)[1]}`).valueOf()]
    }));
    console.log("data", this.data);
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

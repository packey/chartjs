import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { DropdownItem, TecDropdownComponent, TecDateRangePickerComponent, TecDateRangePickerValue } from '@tecan/ui';
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
  runsColor = 'rgb(51,204,51,0.4)'; //green
  pauseColor = 'rgb(255,255,102,1)'; //yellow
  methodColor = 'rgb(61,157,242,0.4)'; //blue
  twoDaysColor = 'rgb(240,56,43,0.4)'; //red
  defaultColor = 'rgb(255,255,255,0)'; //white


  //added options for filter dropdown
  filterByDate = [
    {
      label: "Last week",
      value: "1",
    },
    {
      label: "Last month",
      value: "2",
    },
    {
      label: "Custom range",
      value: "3",
    }
  ]

  showCustomRange = false; //flag for show/hide custom range

  allDaysTime = [
    {
      StartTime: '00:00',
      EndTime: '01:00'
    },
    {
      StartTime: '01:00',
      EndTime: '02:00'
    },
    {
      StartTime: '02:00',
      EndTime: '03:00'
    },
    {
      StartTime: '03:00',
      EndTime: '04:00'
    },
    {
      StartTime: '04:00',
      EndTime: '05:00'
    },
    {
      StartTime: '05:00',
      EndTime: '06:00'
    },
    {
      StartTime: '06:00',
      EndTime: '07:00'
    },
    {
      StartTime: '07:00',
      EndTime: '08:00'
    },
    {
      StartTime: '08:00',
      EndTime: '09:00'
    },
    {
      StartTime: '09:00',
      EndTime: '10:00'
    },
    {
      StartTime: '10:00',
      EndTime: '11:00'
    },
    {
      StartTime: '11:00',
      EndTime: '12:00'
    },
    {
      StartTime: '12:00',
      EndTime: '13:00'
    },
    {
      StartTime: '13:00',
      EndTime: '14:00'
    },
    {
      StartTime: '14:00',
      EndTime: '15:00'
    },
    {
      StartTime: '15:00',
      EndTime: '16:00'
    },
    {
      StartTime: '16:00',
      EndTime: '17:00'
    },
    {
      StartTime: '17:00',
      EndTime: '18:00'
    },
    {
      StartTime: '18:00',
      EndTime: '19:00'
    },
    {
      StartTime: '19:00',
      EndTime: '20:00'
    },
    {
      StartTime: '20:00',
      EndTime: '21:00'
    },
    {
      StartTime: '21:00',
      EndTime: '22:00'
    },
    {
      StartTime: '22:00',
      EndTime: '23:00'
    },
    {
      StartTime: '23:00',
      EndTime: '00:00'
    }
  ];

  mockUpChart = [
    {
      Date: '2023-01-01',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-01 01:00',
        EndTime: '2023-01-01 05:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: [
          {
            StartTime: '2023-01-01 01:00',
            EndTime: '2023-01-01 02:00'
          }
        ]
      }
    },
    {
      Date: '2023-01-01',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-01 07:00',
        EndTime: '2023-01-01 11:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: [
          {
            StartTime: '2023-01-01 08:00',
            EndTime: '2023-01-01 08:40'
          },
          {
            StartTime: '2023-01-01 09:40',
            EndTime: '2023-01-01 10:20'
          }
        ]
      }
    },
    {
      Date: '2023-01-01',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-01 16:00',
        EndTime: '2023-01-01 22:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: [
          {
            StartTime: '2023-01-01 18:00',
            EndTime: '2023-01-01 20:00'
          }
        ]
      }
    },
    {
      Date: '2023-01-02',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-02 01:00',
        EndTime: '2023-01-02 05:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-01-02',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-02 06:00',
        EndTime: '2023-01-02 12:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-01-02',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-02 14:00',
        EndTime: '2023-01-02 20:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-01-03',
      Runs: []
    },
    {
      Date: '2023-01-03',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-02 23:00',
        EndTime: '2023-01-03 01:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-01-05',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-05 01:00',
        EndTime: '2023-01-05 02:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-01-06',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-06 03:00',
        EndTime: '2023-01-06 04:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },

    {
      Date: '2023-01-07',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-07 08:00',
        EndTime: '2023-01-07 09:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },

    {
      Date: '2023-01-08',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-08 10:00',
        EndTime: '2023-01-08 11:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-01-09',
      Runs: []
    },
    {
      Date: '2023-01-10',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-10 15:20',
        EndTime: '2023-01-10 17:20',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-01-11',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-10 21:20',
        EndTime: '2023-01-11 04:20',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-01-12',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-12 02:20',
        EndTime: '2023-01-12 18:20',
        Methods: [
          {
            Name: '',
            StartTime: '2023-01-12 08:00',
            EndTime: '2023-01-12 10:20'
          },
          {
            Name: '',
            StartTime: '2023-01-12 15:20',
            EndTime: '2023-01-12 17:20'
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-01-12',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-01-12 20:00',
        EndTime: '2023-01-12 23:00',
        Methods: [
          {
            Name: '',
            StartTime: '2023-01-12 21:30',
            EndTime: '2023-01-12 22:10'
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-02-03',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-02-03 22:00',
        EndTime: '2023-02-04 02:30',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-02-03',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-02-03 15:00',
        EndTime: '2023-02-03 17:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-02-04',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-02-04 03:20',
        EndTime: '2023-02-04 04:20',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: []
      }
    },
    {
      Date: '2023-02-06',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-02-06 13:00',
        EndTime: '2023-02-06 20:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: [
          {
            StartTime: '2023-02-06 15:00',
            EndTime: '2023-02-06 17:00'
          }
        ]
      }
    },
    {
      Date: '2023-02-07',
      Runs: {
        Name: 'Run abc',
        StartTime: '2023-02-07 11:00',
        EndTime: '2023-02-07 20:00',
        Methods: [
          {
            Name: '',
            StartTime: '',
            EndTime: ''
          }
        ],
        Pauses: [
          {
            StartTime: '2023-02-07 13:00',
            EndTime: '2023-02-07 14:30'
          },
          {
            StartTime: '2023-02-07 18:00',
            EndTime: '2023-02-07 19:30'
          }
        ]
      }
    }
  ];

  constructor() { }

  ngAfterViewInit() {
    this.barChartMethod();
  }

  //method for filtering date
  filterDate(item: DropdownItem) {
    console.log("Selected Item", item);
    if (item.value === "3") {
      this.showCustomRange = true;
      console.log("show custom range", this.showCustomRange);
    } else {
      this.showCustomRange = false;
    }
  }

  //method for custom range
  customRange(item: TecDateRangePickerValue) {
    console.log("Custom Range selected", item);
  }

  separateDate(date: string): { date: string; time: string } {
    const [datePart, timePart] = date.split(' ');

    return { date: datePart, time: timePart };
  }

  barChartTemp() {
    this.mockUpChart.forEach(element => {
      //fill in all intervals for each day - required for days that do not have intervals
      this.allDaysTime.forEach(allDays => {
        var tmpDate = {
          date: element.Date,
          startTime: `${element.Date} ${allDays.StartTime}`,
          endTime: `${element.Date} ${allDays.EndTime}`
        };
        this.backgroundColors.push(this.defaultColor); //white
        this.chartYvalues.push(tmpDate);
      });
      if (element.Runs != undefined && element.Runs != null) {
        this.tmpChartElement.push(element.Runs);
      }
    });

    this.tmpChartElement.forEach((el: any) => {
      //preparing runs element
      if (el.StartTime != undefined && el.StartTime != null) {
        var tmpRun = {
          date: this.separateDate(el.StartTime).date,
          startTime: el.StartTime,
          endTime: el.EndTime
        };
        //checking for start interval on the first day and ending on the second day
        if (this.separateDate(el.StartTime).date != this.separateDate(el.EndTime).date) {
          var startDate = {
            date: this.separateDate(el.StartTime).date,
            startTime: el.StartTime,
            endTime: `${this.separateDate(el.StartTime).date} 23:59`
          };
          var endDate = {
            date: this.separateDate(el.EndTime).date,
            startTime: `${this.separateDate(el.EndTime).date} 00:00`,
            endTime: el.EndTime
          };
          this.chartYvalues.push(startDate);
          this.backgroundColors.push(this.twoDaysColor);
          this.chartYvalues.push(endDate);
          this.backgroundColors.push(this.twoDaysColor);
        } else {
          this.chartYvalues.push(tmpRun);
          this.backgroundColors.push(this.runsColor); //green
        }
      }

      //pauses
      if (el.Pauses != undefined && el.Pauses != null) {
        if (el.Pauses.length > 0) {
          //if there are pauses insert them into the sequence where the result should be displayed by Y axis - to display the pauses as well
          el.Pauses.forEach((elPauses: any) => {
            if (
              elPauses.StartTime != undefined &&
              elPauses.StartTime != null &&
              elPauses.EndTime != undefined &&
              elPauses.EndTime != null
            ) {
              var tmpPauses = {
                date: this.separateDate(el.StartTime).date,
                startTime: elPauses.StartTime,
                endTime: elPauses.EndTime
              };
              this.chartYvalues.push(tmpPauses);
              this.backgroundColors.push(this.pauseColor); //yellow
            }
          });
        }
      }

      //methods
      if (el.Methods != undefined && el.Methods != null) {
        if (el.Methods.length > 0) {
          //if there are methods insert them into the sequence where the result should be displayed by Y axis - to display the pauses as well
          el.Methods.forEach((elMethods: any) => {
            if (
              elMethods.StartTime != undefined &&
              elMethods.StartTime != null &&
              elMethods.EndTime != undefined &&
              elMethods.EndTime != null
            ) {
              var tmpPauses = {
                date: this.separateDate(el.StartTime).date,
                startTime: elMethods.StartTime,
                endTime: elMethods.EndTime
              };
              this.chartYvalues.push(tmpPauses);
              this.backgroundColors.push(this.methodColor); //blue
            }
          });
        }
      }
    });

    this.data = this.chartYvalues.map((item: any) => ({
      x: item.date,
      y: [
        moment(`1970-02-01 ${this.separateDate(item.startTime).time}`).valueOf(),
        moment(`1970-02-01 ${this.separateDate(item.endTime).time}`).valueOf()
      ]
    }));
  }

  barChartMethod() {
    this.barChartTemp();
    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Test',
            data: this.data,
            backgroundColor: this.backgroundColors
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            //min: '2021-11-07',
          },
          y: {
            min: moment('1970-02-01 00:00:00').valueOf(),
            //max: moment('1970-02-01 23:59:59').valueOf(),
            ticks: {
              stepSize: 3.6e6,
              callback: value => {
                let date = moment(value);
                // if (date.diff(moment('1970-02-01 23:59:59'), 'minutes') === 0) {
                //   return null;
                // }
                return date.format('HH:mm');
              }
            }
          }
        },
        plugins: {
          tooltip: {
            enabled: false // <-- this option disables tooltips
          }
        }
      }
    });
  }
}

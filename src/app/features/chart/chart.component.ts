import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { DropdownItem, TecDateRangePickerValue } from '@tecan/ui';
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
  tmpLastWeekElements: any[] = [];
  backgroundColors: any[] = [];
  runColor = 'rgb(51,204,51,0.4)'; //green
  pauseColor = 'rgb(255,255,102,1)'; //yellow
  methodColor = 'rgb(61,157,242,0.4)'; //blue
  twoDaysColor = 'rgb(240,56,43,0.4)'; //red
  defaultColor = 'rgb(255,255,255,0)'; //white

  lastWeekFilter = false;
  lastWeek: any;

  //added options for filter dropdown
  filterByDate = [
    {
      label: 'Last week',
      value: 'LastWeek'
    },
    {
      label: 'Last month',
      value: 'LastMonth'
    },
    {
      label: 'Custom range',
      value: 'CustomRange'
    }
  ];

  showCustomRange = false; //flag for show/hide custom range
  mockUpChart: any;


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

  constructor() { }

  ngAfterViewInit() {
    this.loadMockupData();
    this.barChartMethod();
  }

  loadMockupData() {
    this.mockUpChart = [
      {
        Date: '2023-01-10',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-01-10 02:00',
          EndTime: '2023-01-10 08:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-01-10 03:00',
              EndTime: '2023-01-10 04:00'
            }
          ]
        }
      },
      {
        Date: '2023-01-11',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-01-11 01:00',
          EndTime: '2023-01-11 15:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-01-11 05:00',
              EndTime: '2023-01-11 06:00'
            },
            {
              StartTime: '2023-01-11 11:00',
              EndTime: '2023-01-11 12:00'
            }
          ]
        }
      },
      {
        Date: '2023-01-12',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-01-12 01:00',
          EndTime: '2023-01-12 05:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-01-12 01:00',
              EndTime: '2023-01-12 02:00'
            }
          ]
        }
      },
      {
        Date: '2023-01-13',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-01-13 11:00',
          EndTime: '2023-01-13 17:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-01-13 13:00',
              EndTime: '2023-01-13 13:40'
            }
          ]
        }
      },
      {
        Date: '2023-01-14',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-01-14 01:00',
          EndTime: '2023-01-14 05:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-01-14 01:00',
              EndTime: '2023-01-14 02:00'
            }
          ]
        }
      },
      {
        Date: '2023-01-15',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-01-15 09:00',
          EndTime: '2023-01-15 19:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-01-15 11:00',
              EndTime: '2023-01-15 12:00'
            }
          ]
        }
      },
      {
        Date: '2023-01-16',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-01-16 09:00',
          EndTime: '2023-01-16 13:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-01-16 11:00',
              EndTime: '2023-01-16 12:00'
            }
          ]
        }
      },
      {
        Date: '2023-01-17',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-01-17 16:00',
          EndTime: '2023-01-17 22:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-01-17 18:00',
              EndTime: '2023-01-17 20:00'
            }
          ]
        }
      },
      {
        Date: '2023-01-18',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-01-18 01:00',
          EndTime: '2023-01-18 20:00',
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
        Date: '2023-02-17',
        Run: []
      },
      {
        Date: '2023-02-18',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-02-18 14:00',
          EndTime: '2023-02-18 20:00',
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
        Date: '2023-02-19',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-02-18 23:00',
          EndTime: '2023-02-19 01:00',
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
        Date: '2023-02-20',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-02-20 01:00',
          EndTime: '2023-02-20 02:00',
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
        Date: '2023-02-21',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-02-21 03:00',
          EndTime: '2023-02-21 04:00',
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
        Date: '2023-02-22',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-02-22 08:00',
          EndTime: '2023-02-22 09:00',
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
        Date: '2023-02-23',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-02-23 10:00',
          EndTime: '2023-02-23 11:00',
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
        Date: '2023-02-24',
        Run: []
      },
      {
        Date: '2023-02-25',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-02-25 15:20',
          EndTime: '2023-02-25 17:20',
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
        Date: '2023-02-26',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-02-25 21:20',
          EndTime: '2023-02-26 04:20',
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
        Date: '2023-02-27',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-02-27 02:20',
          EndTime: '2023-02-27 18:20',
          Methods: [
            {
              Name: '',
              StartTime: '2023-02-27 08:00',
              EndTime: '2023-02-27 10:20'
            },
            {
              Name: '',
              StartTime: '2023-02-27 15:20',
              EndTime: '2023-02-27 17:20'
            }
          ],
          Pauses: []
        }
      },
      {
        Date: '2023-02-28',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-02-28 20:00',
          EndTime: '2023-02-28 23:00',
          Methods: [
            {
              Name: '',
              StartTime: '2023-02-28 21:30',
              EndTime: '2023-02-28 22:10'
            }
          ],
          Pauses: []
        }
      },
      {
        Date: '2023-03-09',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-09 22:00',
          EndTime: '2023-03-10 02:30',
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
        Date: '2023-03-12',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-12 03:20',
          EndTime: '2023-03-12 04:20',
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
        Date: '2023-03-13',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-13 13:00',
          EndTime: '2023-03-13 20:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-03-13 15:00',
              EndTime: '2023-03-13 17:00'
            }
          ]
        }
      },
      {
        Date: '2023-03-14',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-14 11:00',
          EndTime: '2023-03-14 20:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-03-14 13:00',
              EndTime: '2023-03-14 14:30'
            },
            {
              StartTime: '2023-03-14 18:00',
              EndTime: '2023-03-14 19:30'
            }
          ]
        }
      },
      {
        Date: '2023-03-15',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-15 15:00',
          EndTime: '2023-03-15 22:00',
          Methods: [
            {
              Name: '',
              StartTime: '2023-03-15 16:00',
              EndTime: '2023-03-15 16:45'
            }
          ],
          Pauses: [
            {
              StartTime: '2023-03-15 19:00',
              EndTime: '2023-03-15 20:00'
            }
          ]
        }
      },
      {
        Date: '2023-03-16',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-16 11:00',
          EndTime: '2023-03-16 20:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-03-16 13:00',
              EndTime: '2023-03-16 14:30'
            },
            {
              StartTime: '2023-03-16 18:00',
              EndTime: '2023-03-16 19:30'
            }
          ]
        }
      },
      {
        Date: '2023-03-17',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-17 03:00',
          EndTime: '2023-03-17 20:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-03-17 05:00',
              EndTime: '2023-03-17 07:00'
            },
            {
              StartTime: '2023-03-17 15:00',
              EndTime: '2023-03-17 17:00'
            }
          ]
        }
      },
      {
        Date: '2023-03-18',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-18 09:00',
          EndTime: '2023-03-18 21:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-03-18 10:00',
              EndTime: '2023-03-18 12:30'
            },
            {
              StartTime: '2023-03-18 18:00',
              EndTime: '2023-03-18 19:30'
            }
          ]
        }
      },
      {
        Date: '2023-03-19',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-19 12:00',
          EndTime: '2023-03-19 19:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-03-19 15:00',
              EndTime: '2023-03-19 17:00'
            }
          ]
        }
      },
      {
        Date: '2023-03-20',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-20 01:00',
          EndTime: '2023-03-20 19:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-03-20 13:00',
              EndTime: '2023-03-20 15:30'
            },
            {
              StartTime: '2023-03-20 17:00',
              EndTime: '2023-03-20 18:00'
            }
          ]
        }
      },
      {
        Date: '2023-03-21',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-21 12:00',
          EndTime: '2023-03-21 18:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-03-21 15:00',
              EndTime: '2023-03-21 17:00'
            }
          ]
        }
      },
      {
        Date: '2023-03-22',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-22 08:00',
          EndTime: '2023-03-22 18:00',
          Methods: [
            {
              Name: '',
              StartTime: '',
              EndTime: ''
            }
          ],
          Pauses: [
            {
              StartTime: '2023-03-14 13:00',
              EndTime: '2023-03-14 14:30'
            },
            {
              StartTime: '2023-03-14 15:00',
              EndTime: '2023-03-14 16:30'
            }
          ]
        }
      },
      {
        Date: '2023-03-23',
        Run: {
          Name: 'Run abc',
          StartTime: '2023-03-23 08:00',
          EndTime: '2023-03-26 18:00',
        }
      }
    ];

  }

  refreshChart() {
    this.data = null;
    this.backgroundColors = [];
    this.chartYvalues = [];
    this.tmpChartElement = [];
    this.barChartTemp();
    this.lastWeek = null;
    this.barChart.data.datasets[0].data = this.data;
    this.barChart.data.datasets[0].backgroundColor = this.backgroundColors;
    this.barChart.update();
  }

  //method for filtering date
  filterDate(item: DropdownItem) {
    this.loadMockupData();
    this.lastWeekFilter = false;
    if (item.value === 'LastWeek') {
      this.lastWeek = this.getLastWeekDateRange();
      this.lastWeekFilter = true;
      this.mockUpChart = this.mockUpChart.filter((data: any) => {
        return moment(data.Date).isBetween(this.lastWeek.lastWeekStart, this.lastWeek.lastWeekEnd, null, '[]');
      });
    }
    if (item.value === 'LastMonth') {
      let lastMonth = this.getLastMonthRange();
      this.mockUpChart = this.mockUpChart.filter((data: any) => {
        return moment(data.Date).isBetween(lastMonth.startDateMonth, lastMonth.endDateMonth, null, '[]');
      });
    }
    if (item.value === 'CustomRange') {
      this.showCustomRange = true;
    } else {
      this.showCustomRange = false;
    }
    this.refreshChart();
  }

  //method for custom range
  customRange(item: TecDateRangePickerValue) {
    this.loadMockupData();
    if (!!item) {
      let customRange = this.getCustomRange(item.start, item.end);
      this.mockUpChart = this.mockUpChart.filter((data: any) => {
        return moment(data.Date).isBetween(customRange.customRangeStart, customRange.customRangeEnd, null, '[]');
      });
    }
    this.refreshChart();
  }

  separateDate(date: string): { date: string; time: string } {
    const [datePart, timePart] = date.split(' ');

    return { date: datePart, time: timePart };
  }

  lastWeekShowingAllDays(lastWeek: any) {
    let tmpDays = lastWeek.lastWeekStart;
    this.backgroundColors = [];
    for (let i = 0; i < 7; i++) {
      var new_date = moment(tmpDays);
      new_date.add(i + 1, 'days').format('YYYY-MM-DD');
      var new_date_string = new_date.format('YYYY-MM-DD')
      if (this.chartYvalues.length == 0) {
        this.allDaysTime.forEach(allDays => {
          var tmpDate = {
            date: new_date.format('YYYY-MM-DD'),
            startTime: `${new_date.format('YYYY-MM-DD')} ${allDays.StartTime}`,
            endTime: `${new_date.format('YYYY-MM-DD')} ${allDays.EndTime}`
          };
          this.backgroundColors.push(this.defaultColor); //white
          this.tmpLastWeekElements.push(tmpDate);
        });
      } else {
        if (this.chartYvalues.filter((e: any) => e.date === new_date_string).length > 0) {
          var tmpDate = this.chartYvalues.find((e: any) => e.date === new_date_string);
          this.backgroundColors.push(tmpDate.color);
          this.tmpLastWeekElements.push(tmpDate);
        } else {
          this.allDaysTime.forEach(allDays => {
            var tmpDate = {
              date: new_date.format('YYYY-MM-DD'),
              startTime: `${new_date.format('YYYY-MM-DD')} ${allDays.StartTime}`,
              endTime: `${new_date.format('YYYY-MM-DD')} ${allDays.EndTime}`
            };
            this.backgroundColors.push(this.defaultColor); //white
            this.tmpLastWeekElements.push(tmpDate);
          });
        }
      }
    }
    this.chartYvalues = this.tmpLastWeekElements;
    this.tmpLastWeekElements = [];
  }

  getLastWeekDateRange() {
    let currentDate = moment();
    let lastWeekStartDate = moment(currentDate).subtract(1, 'week').startOf('week');
    let lastWeekEndDate = moment(currentDate).subtract(1, 'week').endOf('week');

    return { lastWeekStart: lastWeekStartDate.format('YYYY-MM-DD'), lastWeekEnd: lastWeekEndDate.format('YYYY-MM-DD') };
  }

  getLastMonthRange() {
    let currentDate = new Date();
    let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let lastDayPrevMonth = new Date(firstDay.getTime() - 1);
    let firstDayPrevMonth = new Date(lastDayPrevMonth.getFullYear(), lastDayPrevMonth.getMonth(), 1);

    return { startDateMonth: firstDayPrevMonth, endDateMonth: lastDayPrevMonth };
  }

  getCustomRange(startDate: string, endDate: string) {
    let customRangeStartDate = moment(startDate);
    let customRangeEndDate = moment(endDate);

    return { customRangeStart: customRangeStartDate.format('YYYY-MM-DD'), customRangeEnd: customRangeEndDate.format('YYYY-MM-DD') };
  }

  barChartTemp() {
    if (this.mockUpChart.length > 0) {
      this.mockUpChart.forEach((element: any) => {
        if (!!element.Run) {
          if (element.Run.StartTime == undefined) {
            var tmpDate = {
              date: element.Date,
              StartTime: `${element.Date} 00:00`,
              EndTime: `${element.Date} 01:00`,
              setWhiteColor: true
            };
            this.tmpChartElement.push(tmpDate);
          } else {
            this.tmpChartElement.push(element.Run);
          }
        }
      });
    }

    this.tmpChartElement.forEach((el: any) => {
      //preparing run element
      if (el.StartTime != undefined && el.StartTime != null) {
        var tmpRun = {
          date: this.separateDate(el.StartTime).date,
          startTime: el.StartTime,
          endTime: el.EndTime,
          color: this.runColor
        };

        //checking for start interval on the first day and ending on the second day
        if (this.separateDate(el.StartTime).date != this.separateDate(el.EndTime).date) {
          var startDate = {
            date: this.separateDate(el.StartTime).date,
            startTime: el.StartTime,
            endTime: `${this.separateDate(el.StartTime).date} 23:59`,
            color: this.twoDaysColor
          };
          var endDate = {
            date: this.separateDate(el.EndTime).date,
            startTime: `${this.separateDate(el.EndTime).date} 00:00`,
            endTime: el.EndTime,
            color: this.twoDaysColor
          };
          this.chartYvalues.push(startDate);
          this.backgroundColors.push(this.twoDaysColor);
          this.chartYvalues.push(endDate);
          this.backgroundColors.push(this.twoDaysColor);
        } else {
          if (el.setWhiteColor == true) {
            var tmpEmptyElement = {
              date: this.separateDate(el.StartTime).date,
              startTime: el.StartTime,
              endTime: el.EndTime,
              color: this.defaultColor
            };
            this.chartYvalues.push(tmpEmptyElement);
            this.backgroundColors.push(this.defaultColor); //white
          } else {
            this.chartYvalues.push(tmpRun);
            this.backgroundColors.push(this.runColor); //green
          }
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
                endTime: elPauses.EndTime,
                color: this.pauseColor
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
                endTime: elMethods.EndTime,
                color: this.methodColor
              };
              this.chartYvalues.push(tmpPauses);
              this.backgroundColors.push(this.methodColor); //blue
            }
          });
        }
      }
    });
    if (this.lastWeekFilter) {
      this.lastWeekShowingAllDays(this.lastWeek);
    }

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
            label: '',
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
            //beginAtZero: true,
            //max: moment('1970-02-01 23:59:59').valueOf(),
            ticks: {
              stepSize: 3.6e+6,
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

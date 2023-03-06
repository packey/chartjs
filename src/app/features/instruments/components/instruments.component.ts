import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TecToastService } from '@tecan/ui';

import { ConfirmationDialogComponent } from '~shared/confirmation-dialog/confirmation-dialog.component';
import { trackById } from '~shared/helpers/track-by.helper';
import Chart from 'chart.js/auto'
import moment from 'moment';

@Component({
  selector: 'capp-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstrumentsComponent implements AfterViewInit {
  @ViewChild(MatSort, { static: true }) private sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  barChart: any;
  tmpLab: any;
  data: any;

  labels: any[] = [];
  DATA_COUNT = 7;
  NUMBER_CFG = { count: this.DATA_COUNT, min: -100, max: 100 };

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
          _1: "",
          _2: "",
          _3: "",
          _4: "",
        },
        {
          _0: "2023-02-25",
          _1: "",
          _2: "",
          _3: "",
          _4: "",
        },
        {
          _0: "2023-02-26",
          _1: "",
          _2: "",
          _3: "",
          _4: "",
        },
        {
          _0: "2023-02-26",
          _1: "",
          _2: "",
          _3: "",
          _4: "",
          _5: "running",
        },
        {
          _0: "2023-02-26",
          _1: "",
          _2: "",
          _3: "",
          _4: "",
          _5: "pause",
        },
        {
          _0: "2023-02-26",
          _1: "",
          _2: "",
          _3: "",
          _4: "",
          _5: "idle",
        },
        {
          _0: "2023-02-26",
          _1: "03:43",
          _2: "03:43",
          _3: "test_run",
          _4: "",
          _5: "idle",
        },
        {
          _0: "2023-02-26",
          _1: "03:43",
          _2: "03:55",
          _3: "test_run",
          _4: "unknown",
          _5: "running",
        },
        {
          _0: "2023-02-27",
          _1: "",
          _2: "",
          _3: "",
          _4: "",
        },
        {
          _0: "2023-02-28",
          _1: "",
          _2: "",
          _3: "",
          _4: "",
        },
        {
          _0: "2023-03-01",
          _1: "",
          _2: "",
          _3: "",
          _4: "",
        },
        {
          _0: "2023-03-02",
          _1: "",
          _2: "",
          _3: "",
          _4: "",
        },
      ],
    },
  ];




  // eslint-disable-next-line @typescript-eslint/no-unused-vars



  instruments = [
    { id: '1', serialNumber: '2121352006', alias: 'Spike 1' },
    { id: '2', serialNumber: '2121352007', alias: 'Spike 2' },
    { id: '3', serialNumber: '2121352008', alias: 'Spike 3' },
    { id: '4', serialNumber: '2121352009', alias: 'Spike 4' },
    { id: '5', serialNumber: '2121352010', alias: 'Spike 5' },
    { id: '6', serialNumber: '2121352011', alias: 'Spike 6' },
    { id: '7', serialNumber: '2121352012', alias: 'Spike 7' },
    { id: '8', serialNumber: '2121352013', alias: 'Spike 8' },
    { id: '9', serialNumber: '2121352014', alias: 'Spike 9' },
    { id: '10', serialNumber: '2121352015', alias: 'Spike 10' },
    { id: '11', serialNumber: '2121352016', alias: 'Spike 11' },
    { id: '12', serialNumber: '2121352017', alias: 'Spike 12' }
  ];

  displayedColumns = ['serialNumber', 'alias'];
  pageSizeOptions = [10, 20, 30, 40, 50];
  instrumentsDataSource = new MatTableDataSource(this.instruments);

  getById = trackById;

  constructor(private toastService: TecToastService, private dialogService: MatDialog) { }

  ngAfterViewInit() {
    this.instrumentsDataSource.sort = this.sort;
    this.instrumentsDataSource.paginator = this.paginator;
    this.barChartMethod();
    this.barChartTemp();
  }

  barChartTemp() {
    this.mockUpChart.forEach(element => {
      if (element.rows != undefined && element.rows != null) {
        this.tmpLab = element.rows != undefined ? element.rows : '';
      }
    });
    this.tmpLab.forEach((el: any) => {
      if (el._0 != undefined && el._0 != null) {
        if (!this.labels.includes(el._0)) {
          // ✅ only runs if value not in array
          this.labels.push(el._0);
        }
      }
    });
    console.log("tmpLab ", this.tmpLab);
    console.log("lables", this.labels);

    // this.data = years.map((year, index) => ({
    //   x: moment(`${year}-01-01`),
    //   y: moment(`1970-02-01 ${times[index]}`).valueOf()
    // }));

    // data = {
    //   labels: labels,
    //   datasets: [
    //     {
    //       label: 'Dataset 1',
    //       data: Utils.numbers(NUMBER_CFG),
    //       backgroundColor: Utils.CHART_COLORS.red,
    //     },
    //     {
    //       label: 'Dataset 2',
    //       data: Utils.numbers(NUMBER_CFG),
    //       backgroundColor: Utils.CHART_COLORS.blue,
    //     },
    //     {
    //       label: 'Dataset 3',
    //       data: Utils.numbers(NUMBER_CFG),
    //       backgroundColor: Utils.CHART_COLORS.green,
    //     },
    //   ]
    // };
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      // type: 'bar',
      // data: {
      //   labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
      //   datasets: [
      //     {
      //       label: '# of Votes',
      //       //data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      //       data: [200, 50, 30, 15, 20, 34],
      //       backgroundColor: [
      //         'rgba(255, 99, 132, 0.2)',
      //         'rgba(54, 162, 235, 0.2)',
      //         'rgba(255, 206, 86, 0.2)',
      //         'rgba(75, 192, 192, 0.2)',
      //         'rgba(153, 102, 255, 0.2)',
      //         'rgba(255, 159, 64, 0.2)',
      //       ],
      //       borderColor: [
      //         'rgba(255,99,132,1)',
      //         'rgba(54, 162, 235, 1)',
      //         'rgba(255, 206, 86, 1)',
      //         'rgba(75, 192, 192, 1)',
      //         'rgba(153, 102, 255, 1)',
      //         'rgba(255, 159, 64, 1)',
      //       ],
      //       borderWidth: 1,
      //     },
      //   ],
      // },
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true,
      //     },
      //   },
      // },

      type: 'bar',
      data: {
        datasets: [{
          label: '# of Votes',
          data: [{
            x: '2021-11-06',
            //y: [1526652800, 1626652800],
            y: [moment(`1970-02-01 11:45`).valueOf(), moment(`1970-02-01 11:55`).valueOf()],
          }, {
            x: '2021-11-07',
            //y: [927862400, 1006652800],
            y: [moment(`1970-02-01 13:35`).valueOf(), moment(`1970-02-01 14:55`).valueOf()],
          }, {
            x: '2021-11-07',
            // y: [327862400, 527862400],
            y: [moment(`1970-02-01 16:45`).valueOf(), moment(`1970-02-01 17:15`).valueOf()],
          },
          {
            x: '2021-11-07',
            // y: [1337862400, 1447862400],
            y: [moment(`1970-02-01 10:45`).valueOf(), moment(`1970-02-01 11:05`).valueOf()],
          },
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          x: {
            min: '2021-11-07',
          },
          // y:
          // {
          //   type: 'timeseries',
          //   position: 'left',
          //   ticks: {
          //     // min: moment('1970-02-01 00:00:00').valueOf(),
          //     // max: moment('1970-02-01 23:59:59').valueOf(),
          //     //stepSize: 3.6e+6,
          //     callback: value => {
          //       let date = moment(value);
          //       if (date.diff(moment('1970-02-01 23:59:59'), 'minutes') === 0) {
          //         return null;
          //       }

          //       return date.format('h A');
          //     }
          //   }
          // }
          y: {
            //type: 'time',
            position: 'left',
            beginAtZero: false,
            //min: moment('1970-02-01 00:00:00').valueOf(),
            //max: moment('1970-02-01 23:59:59').valueOf(),
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

  onConfirmClick() {
    this.dialogService.open(ConfirmationDialogComponent, {
      data: {
        headerTitle: 'Delete',
        content: 'Are you sure you want to delete this?',
        actionLabels: {
          cancel: 'Cancel',
          confirm: 'Delete'
        }
      }
    });
  }

  onToastClick() {
    this.toastService.error('core.notFound.description');
  }
}

import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TecToastService } from '@tecan/ui';

import { ConfirmationDialogComponent } from '~shared/confirmation-dialog/confirmation-dialog.component';
import { trackById } from '~shared/helpers/track-by.helper';

@Component({
  selector: 'capp-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstrumentsComponent implements AfterViewInit {
  @ViewChild(MatSort, { static: true }) private sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

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

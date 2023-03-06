import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCellDef, MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTable } from '@angular/material/table';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TranslatePipe } from '@ngx-translate/core';
import { TecButtonComponent, TecIconComponent, TecToastService } from '@tecan/ui';
import { MockComponents, MockDirectives, MockPipe, MockProvider } from 'ng-mocks';
import { ChartComponent } from './chart.component';


describe('ChartComponent', () => {
  let spectator: Spectator<ChartComponent>;

  const createComponent = createComponentFactory({
    component: ChartComponent,
    imports: [MatPaginatorModule, MatSortModule],
    declarations: [
      MockPipe(TranslatePipe),
      MockComponents(MatTable, TecIconComponent, TecButtonComponent),
      MockDirectives(MatHeaderRowDef, MatHeaderCellDef, MatCellDef, MatRowDef)
    ],
    providers: [MockProvider(TecToastService), MockProvider(MatDialog)]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

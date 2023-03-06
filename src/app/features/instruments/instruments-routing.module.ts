import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstrumentsComponent } from '~instruments/components/instruments.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: InstrumentsComponent,
  },
  {
    path: 'chart',
    component: ChartComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstrumentsRoutingModule { }

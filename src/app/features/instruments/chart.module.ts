import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import * as fromInstrumentsRoot from '~instruments/store/instruments-root.reducer';
import { InstrumentsEffects } from '~instruments/store/instruments/instruments.effects';
import { SharedModule } from '~shared/shared.module';
import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    TranslateModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    EffectsModule.forFeature([InstrumentsEffects]),
    StoreModule.forFeature(fromInstrumentsRoot.instrumentsFeatureKey, fromInstrumentsRoot.reducer)
  ]
})
export class ChartModule { }

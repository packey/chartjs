import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { TecDialogModule, TecToastModule, TecanUiModule } from '@tecan/ui';

import { PermissionPipe } from '~shared/auth/permission.pipe';
import { ConfirmationDialogComponent } from '~shared/confirmation-dialog/confirmation-dialog.component';
import { EmptyPipe } from '~shared/pipes/empty.pipe';
import { LocationPipe } from '~shared/pipes/location.pipe';

@NgModule({
  declarations: [EmptyPipe, LocationPipe, PermissionPipe, ConfirmationDialogComponent],
  imports: [TecanUiModule, MatDialogModule, TecDialogModule, TranslateModule, CommonModule, TecToastModule],
  exports: [TecanUiModule, PermissionPipe, ConfirmationDialogComponent, TecToastModule]
})
export class SharedModule {}

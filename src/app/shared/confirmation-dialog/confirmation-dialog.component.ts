import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmActions } from '~shared/confirmation-dialog/models/confirm-actions.enum';
import { ConfirmationDialogData } from '~shared/confirmation-dialog/models/confirmation-dialog-data.interface';

@Component({
  selector: 'capp-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  action = ConfirmActions;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {}
}

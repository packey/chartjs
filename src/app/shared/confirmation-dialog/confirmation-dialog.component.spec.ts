import { Renderer2 } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TranslatePipe } from '@ngx-translate/core';
import { TecButtonComponent, TecDropdownComponent, TecIconComponent, TecInputComponent } from '@tecan/ui';
import { MockComponents, MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

import { ConfirmationDialogComponent } from '~shared/confirmation-dialog/confirmation-dialog.component';

describe('UserFormComponent', () => {
  let spectator: Spectator<ConfirmationDialogComponent>;

  const createComponent = createComponentFactory({
    component: ConfirmationDialogComponent,
    imports: [ReactiveFormsModule, MatDialogModule],
    providers: [
      MockProvider(MAT_DIALOG_DATA, {
        headerTitle: 'test',
        status: 'test-status',
        actionLabels: {
          cancel: 'cancel',
          save: 'save'
        },
        saveAction: 'action'
      }),
      MockProvider(MatDialogRef, {
        afterOpened: () => of(),
        afterClosed: () => of()
      }),
      MockProvider(Renderer2)
    ],
    declarations: [
      MockPipe(TranslatePipe),
      MockComponents(TecButtonComponent, TecInputComponent, TecDropdownComponent, TecIconComponent)
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

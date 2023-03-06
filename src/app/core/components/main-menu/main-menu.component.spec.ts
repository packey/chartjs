import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TranslatePipe } from '@ngx-translate/core';
import { TecSidebarComponent, TecSidebarItemComponent } from '@tecan/ui';
import { MockComponents, MockPipes } from 'ng-mocks';

import { MainMenuComponent } from '~core/components/main-menu/main-menu.component';
import { EmptyPipe } from '~shared/pipes/empty.pipe';

describe('MainMenuComponent', () => {
  let spectator: Spectator<MainMenuComponent>;

  const createComponent = createComponentFactory({
    declarations: [MockPipes(EmptyPipe, TranslatePipe), MockComponents(TecSidebarComponent, TecSidebarItemComponent)],
    component: MainMenuComponent,
    imports: [RouterTestingModule]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, SpyObject, createComponentFactory } from '@ngneat/spectator';
import { TranslatePipe } from '@ngx-translate/core';
import { TecHeaderComponent } from '@tecan/ui';
import { MockComponents, MockPipes, MockProvider } from 'ng-mocks';

import { ErrorLayoutComponent } from '~core/components/error-layout/error-layout.component';
import { UserSettingsService } from '~core/services/user-settings.service';

describe('ErrorLayoutComponent', () => {
  let spectator: Spectator<ErrorLayoutComponent>;
  const createComponent = createComponentFactory({
    component: ErrorLayoutComponent,
    imports: [RouterTestingModule],
    declarations: [MockComponents(TecHeaderComponent), MockPipes(TranslatePipe)],
    providers: [MockProvider(UserSettingsService)]
  });
  let userSettings: SpyObject<UserSettingsService>;

  beforeEach(() => {
    spectator = createComponent();

    userSettings = spectator.inject(UserSettingsService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should init user settings', () => {
    expect(userSettings.init).toHaveBeenCalledTimes(1);
  });
});

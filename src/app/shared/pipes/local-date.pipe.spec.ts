import { LocaleDatePipe } from '~shared/pipes/local-date.pipe';
import { LocaleService } from '~shared/services/locale.service';

const date = new Date('2020-12-14T14:02:33.74537Z');
describe('LocaleDatePipe', () => {
  const pipe = new LocaleDatePipe('en', new LocaleService());

  it('should transform date to en date format', () => {
    expect(pipe.transform(date, 'medium', 'UTC +0')).toBe('Dec 14, 2020, 2:02:33 PM');
  });

  it('should returns null, when passed value is null', () => {
    expect(pipe.transform(null)).toBe(null);
  });

  it('should returns null, when passed value is empty string', () => {
    expect(pipe.transform('')).toBe(null);
  });
});

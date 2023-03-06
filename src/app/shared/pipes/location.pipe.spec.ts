import { PipeTransform } from '@angular/core';

import { LocationPipe } from '~shared/pipes/location.pipe';

describe('LocationPipe', () => {
  let pipe: PipeTransform;

  // const safePares

  beforeAll(() => {
    pipe = new LocationPipe();
  });

  const cases = [
    { value: { countryName: 'Germany', city: 'Berlin' }, expected: 'Germany, Berlin' },
    { value: { city: 'Berlin' }, expected: '' },
    { value: { countryName: 'Germany' }, expected: '' },
    { value: { countryName: 'Germany' }, showPartial: false, expected: '' },
    { value: { countryName: 'Germany' }, showPartial: false, emptyLabel: '-', expected: '-' },
    { value: { countryName: 'Germany' }, showPartial: true, expected: 'Germany' },
    { value: { city: 'Berlin' }, showPartial: true, expected: 'Berlin' },
    { expected: '' },
    { value: null, expected: '' }
  ];

  cases.forEach(c => {
    it(`should return ${c.expected} when pass ${JSON.stringify(c.value)} and pass partial ${
      c.showPartial
    }, empty label ${c.emptyLabel}...`, () => {
      expect(pipe.transform(c.value, c.showPartial, c.emptyLabel)).toBe(c.expected);
    });
  });
});

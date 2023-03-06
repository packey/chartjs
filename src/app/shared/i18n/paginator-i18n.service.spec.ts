import { EventEmitter } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator';
import { TranslateService } from '@ngx-translate/core';
import { MockProvider } from 'ng-mocks';
import { identity } from 'rxjs';

import { PaginatorI18nService } from '~shared/i18n/paginator-i18n.service';

describe('PaginatorI18nService', () => {
  const onLangChange = new EventEmitter();
  let spectator: SpectatorService<PaginatorI18nService>;
  const createService = createServiceFactory({
    service: PaginatorI18nService,
    providers: [
      MockProvider(TranslateService, {
        onLangChange
      })
    ]
  });

  let translateService: SpyObject<TranslateService>;

  beforeEach(() => {
    spectator = createService();
    translateService = spectator.inject<any>(TranslateService);
    translateService.instant.and.callFake(identity);
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should use proper labels', () => {
    expect(spectator.service.firstPageLabel).toBe('shared.paging.firstPage');
    expect(spectator.service.lastPageLabel).toBe('shared.paging.lastPage');
    expect(spectator.service.itemsPerPageLabel).toBe('shared.paging.itemsPerPage');
    expect(spectator.service.nextPageLabel).toBe('shared.paging.nextPage');
    expect(spectator.service.previousPageLabel).toBe('shared.paging.previousPage');
  });

  it('should emit when language changes', fakeAsync(() => {
    let changesCount = 0;
    spectator.service.changes.subscribe(() => changesCount++);

    onLangChange.emit();
    onLangChange.emit();
    onLangChange.emit();

    expect(changesCount).toBe(3);
  }));

  [
    {
      value: {
        page: 0,
        pageSize: 10,
        length: 17
      },
      expected: {
        key: 'shared.paging.range',
        params: {
          page: 1,
          pageSize: 10,
          length: 17,
          totalPages: 2
        }
      }
    },
    {
      value: {
        page: 1,
        pageSize: 10,
        length: 17
      },
      expected: {
        key: 'shared.paging.range',
        params: {
          page: 2,
          pageSize: 10,
          length: 17,
          totalPages: 2
        }
      }
    },
    {
      value: {
        page: 0,
        pageSize: 10,
        length: 0
      },
      expected: {
        key: 'shared.paging.range',
        params: {
          page: 1,
          pageSize: 10,
          length: 0,
          totalPages: 1
        }
      }
    }
  ].forEach(({ value, expected }) => {
    it(`should return range label for ${JSON.stringify(value)}`, () => {
      const actual = spectator.service.getRangeLabel(value.page, value.pageSize, value.length);

      expect(actual).toBe(expected.key);
      expect(translateService.instant).toHaveBeenCalledOnceWith(expected.key, expected.params);
    });
  });
});

import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable()
export class PaginatorI18nService implements MatPaginatorIntl {
  changes: Subject<void> = new Subject();

  get itemsPerPageLabel(): string {
    return this.translateService.instant('shared.paging.itemsPerPage');
  }

  get nextPageLabel(): string {
    return this.translateService.instant('shared.paging.nextPage');
  }

  get previousPageLabel(): string {
    return this.translateService.instant('shared.paging.previousPage');
  }

  get firstPageLabel(): string {
    return this.translateService.instant('shared.paging.firstPage');
  }

  get lastPageLabel(): string {
    return this.translateService.instant('shared.paging.lastPage');
  }

  constructor(private translateService: TranslateService) {
    this.translateService.onLangChange.subscribe(() => this.changes.next());
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    const totalPages = Math.max(Math.ceil(length / pageSize), 1);

    return this.translateService.instant('shared.paging.range', {
      page: page + 1,
      pageSize,
      length,
      totalPages
    });
  }
}

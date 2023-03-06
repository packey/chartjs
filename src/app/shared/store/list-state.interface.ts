import { HttpErrorResponse } from '@angular/common/http';

export interface ListState<T> {
  items: T[];
  isLoading: boolean;
  error: HttpErrorResponse | null;
}

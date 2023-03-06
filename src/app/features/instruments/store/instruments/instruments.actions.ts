import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const getAll = createAction('[Instruments] Get Instruments');

export const getAllSuccess = createAction('[Instruments] Get Instruments Success', props<{ items: any[] }>());

export const getAllError = createAction('[Instruments] Get Instruments Error', props<{ error: HttpErrorResponse }>());

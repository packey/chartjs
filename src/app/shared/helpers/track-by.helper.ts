import { TrackByFunction } from '@angular/core';

export const trackById: TrackByFunction<{ id: string }> = (_, { id }) => id;

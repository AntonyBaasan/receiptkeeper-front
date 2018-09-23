import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import { counterReducer, CounterState } from './counter.reducer';
import { recordReducer, RecordState } from '../records/reducers/record.reducer';

export interface AppState {
  counter: CounterState;
  recordState: RecordState;
}

export const reducers: ActionReducerMap<AppState> = {
  counter: counterReducer,
  recordState: recordReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

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

export interface State {
  counter: CounterState;
  recordState: RecordState;
}

export const reducers: ActionReducerMap<State> = {
  counter: counterReducer,
  recordState: recordReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

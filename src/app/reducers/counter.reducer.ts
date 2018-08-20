import { Action } from '@ngrx/store';
import { CounterActionTypes, CounterActions } from '../actions/counter.actions';

export interface CounterState {
  count: number;
}

export const initialState: CounterState = {
  count: 0
};

export function counterReducer(
  state = initialState,
  action: CounterActions
): CounterState {
  switch (action.type) {
    case CounterActionTypes.INCREMENT:
      return Object.assign({}, state, { count: state.count + 1 });

    case CounterActionTypes.DECREMENT:
      return Object.assign({}, state, { count: state.count - 1 });

    case CounterActionTypes.RESET:
      return Object.assign({}, state, { count: 0 });

    default:
      return state;
  }
}

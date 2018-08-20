import { Action } from '@ngrx/store';

export enum CounterActionTypes {
  INCREMENT = '[Counter] Increment',
  DECREMENT = '[Counter] Decrement',
  RESET = '[Counter] Reset',
}

export class IncrementCounters implements Action {
  readonly type = CounterActionTypes.INCREMENT;
}
export class DecrementCounters implements Action {
  readonly type = CounterActionTypes.DECREMENT;
}
export class ResetCounters implements Action {
  readonly type = CounterActionTypes.RESET;
}

export type CounterActions = IncrementCounters | DecrementCounters | ResetCounters;

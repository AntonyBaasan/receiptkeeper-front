import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Record } from '../models/record.model';
import { RecordActions, RecordActionTypes } from '../actions/record.actions';

export interface RecordState extends EntityState<Record> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Record> = createEntityAdapter<Record>();

export const initialState: RecordState = adapter.getInitialState({
  // additional entity state properties
});

export function recordReducer(
  state = initialState,
  action: RecordActions
): RecordState {
  switch (action.type) {
    case RecordActionTypes.AddRecord: {
      return adapter.addOne(action.payload.record, state);
    }

    case RecordActionTypes.UpsertRecord: {
      return adapter.upsertOne(action.payload.record, state);
    }

    case RecordActionTypes.AddRecords: {
      return adapter.addMany(action.payload.records, state);
    }

    case RecordActionTypes.UpsertRecords: {
      return adapter.upsertMany(action.payload.records, state);
    }

    case RecordActionTypes.UpdateRecord: {
      return adapter.updateOne(action.payload.record, state);
    }

    case RecordActionTypes.UpdateRecords: {
      return adapter.updateMany(action.payload.records, state);
    }

    case RecordActionTypes.DeleteRecord: {
      return adapter.removeOne(action.payload.id, state);
    }

    case RecordActionTypes.DeleteRecords: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case RecordActionTypes.LoadRecords: {
      return adapter.addAll(action.payload.records, state);
    }

    case RecordActionTypes.ClearRecords: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

import { Component, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AddRecord, SetSelectedRecords } from '../../actions/record.actions';
import { selectAllRecords, RecordState } from '../../reducers/record.reducer';
import { Record } from '../../models/record.model';
import { Observable } from 'rxjs';
import { AppState } from '../../../reducers';

@Component({
  selector: 'app-records-shell',
  templateUrl: './records-shell.component.html',
  styleUrls: ['./records-shell.component.css']
})
export class RecordsShellComponent implements OnInit {

  records$: Observable<Record[]>;
  selectedRecordIds$: Observable<string[]>;
  name: string;

  constructor(private store: Store<AppState>) {
    this.records$ = this.store.pipe(select(selectAllRecords));
    this.selectedRecordIds$ = this.store.pipe(select(state => state.recordState.selectedIds));
  }

  ngOnInit(): void {
  }

  onClickAddRecord() {
    const randomId = Math.random() * 100000;
    this.store.dispatch(new AddRecord({
      record: {
        id: '' + (randomId),
        title: 'Title ' + (randomId)
      }
    }));
  }

  onSelectionUpdate(selectedIds: string[]) {
    console.log('record selected: ' + selectedIds);

    this.store.dispatch(new SetSelectedRecords({
      ids: selectedIds
    }));
  }

}

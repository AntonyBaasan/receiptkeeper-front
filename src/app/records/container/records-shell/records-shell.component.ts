import { Component, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AddRecord } from '../../actions/record.actions';
import { selectAllRecords } from '../../reducers/record.reducer';
import { Record } from '../../models/record.model';
import { Observable } from 'rxjs';

interface AppState {
  counter: number;
  recordState: any[];
}

@Component({
  selector: 'app-records-shell',
  templateUrl: './records-shell.component.html',
  styleUrls: ['./records-shell.component.css']
})
export class RecordsShellComponent implements OnInit {

  records$: Observable<Record[]>;
  name: string;

  constructor(private store: Store<AppState>) {
    this.records$ = this.store.pipe(select(selectAllRecords));
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

}

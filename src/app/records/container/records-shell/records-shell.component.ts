import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddRecord } from '../../actions/record.actions';
import { selectAllRecords } from '../../reducers/record.reducer';
import { Record } from '../../models/record.model';
import { Observable } from 'rxjs';
import { EntityState, Dictionary } from '@ngrx/entity';
import { map } from 'rxjs/operators';


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

  recordState$: Observable<any>;
  records: Record[];
  tempId = 1;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.recordState$ = this.store.select(selectAllRecords);
    this.recordState$.subscribe((data: Record[]) => {
      this.records = data;
    });
  }

  addRecord() {
    this.store.dispatch(new AddRecord({
      record: {
        id: '' + (this.tempId++),
        title: 'Title ' + (this.tempId)
      }
    }));
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddRecord } from '../../actions/record.actions';


interface AppState {
  counter: number;
  recordState: any[]
}

@Component({
  selector: 'app-records-shell',
  templateUrl: './records-shell.component.html',
  styleUrls: ['./records-shell.component.css']
})
export class RecordsShellComponent implements OnInit {

  recordState:any;
  tempId = 1;

  constructor(private store: Store<AppState>) {
    this.recordState = store.select('recordState');
  }

  ngOnInit() {
  }

  addRecord() {
    this.store.dispatch(new AddRecord({
        record: {id: ""+(this.tempId++)}
    }));
  }

}

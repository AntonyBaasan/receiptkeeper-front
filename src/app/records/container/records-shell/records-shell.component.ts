import * as _ from 'lodash';
import { Component, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AddRecord, SetSelectedRecords } from '../../actions/record.actions';
import { selectAllRecords, RecordState } from '../../reducers/record.reducer';
import { Record } from '../../models/record.model';
import { Observable } from 'rxjs';
import { AppState } from '../../../reducers';
import { RecordEditComponent } from '../../presentation/record-edit/record-edit.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-records-shell',
  templateUrl: './records-shell.component.html',
  styleUrls: ['./records-shell.component.css']
})
export class RecordsShellComponent implements OnInit {

  records$: Observable<Record[]>;
  selectedRecordIds$: Observable<string[]>;
  name: string;

  constructor(private store: Store<AppState>,
    public dialog: MatDialog) {
    this.records$ = this.store.pipe(select(selectAllRecords));
    this.selectedRecordIds$ = this.store.pipe(select(state => state.recordState.selectedIds));
  }

  ngOnInit(): void {
  }

  onClickAddRecord() {
    // const randomId = Math.random() * 100000;
    // this.store.dispatch(new AddRecord({
    //   record: {
    //     id: '' + (randomId),
    //     title: 'Title ' + (randomId)
    //   }
    // }));
    const newRecord = {
      title: 'New title',
      description: 'New description',
      date: new Date(),
    } as Record;

    this.showDialog(newRecord);
  }


  onSelectionUpdate(selectedIds: string[]) {
    console.log('record selected: ' + selectedIds);

    this.store.dispatch(new SetSelectedRecords({
      ids: selectedIds
    }));
  }

  private showDialog(record: Record) {
    const dialogRef = this.dialog.open(RecordEditComponent, {
      width: '550px',
      data: { record: _.cloneDeep(record) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'Cancel') {
      } else if (result.action === 'Update') {
      } else if (result.action === 'AddNew') {
      }

      console.log(`Dialog result: ${result}`);
    });
  }

}

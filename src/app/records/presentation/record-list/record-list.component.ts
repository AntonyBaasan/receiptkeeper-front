import * as _ from 'lodash';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatCheckboxChange } from '@angular/material';
import { Record } from '../../models/record.model';
import { ReceiptService } from '../../../services/receipt.service';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FilterInfo } from '../../../model/filter-info.model';
import { PageInfo } from '../../../model/page-info.model';
import { Page } from '../../../model/page.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordListComponent implements OnInit {
  @Input() records: Record[];
  @Input() selectedRecordIds: number[];
  @Output() reload = new EventEmitter();
  @Output() unselect = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() onSelectionUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onClickEdit: EventEmitter<any> = new EventEmitter();

  targetReceipt: Record;
  displayedColumns = ['select', 'date', 'title', 'description', 'total'];
  dataSource = new MatTableDataSource<Record>();
  selection = new SelectionModel<Record>(true, []);
  isLoadingResults = false;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.records;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.records || [];
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onSelect($event: MatCheckboxChange, row: Record) {
    console.log("OnSelect call..");

    this.selection.toggle(row);

    this.onSelectionUpdate.emit({ selectedIds: this.selection.selected.map(s => s.id) });
  }

  pageChangeClicked() { }

  editReceipt(row: Record) { }
}

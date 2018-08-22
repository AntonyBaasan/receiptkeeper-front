import * as _ from 'lodash';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
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
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  @Input() records: Record[];
  @Output() reload = new EventEmitter();
  @Output() unselect = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  targetReceipt: Record;
  displayedColumns = ['select', 'date', 'title', 'description', 'total'];
  dataSource = new MatTableDataSource<Record>();
  selection = new SelectionModel<Record>(true, []);
  isLoadingResults = false;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.records;
    // this.dataSource.data = [];
  }

  pageChangeClicked() { }

  editReceipt(row: Record) { }
}

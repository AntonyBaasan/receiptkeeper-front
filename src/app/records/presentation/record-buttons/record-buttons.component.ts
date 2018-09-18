import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Record } from '../../models/record.model';

@Component({
  selector: 'app-record-buttons',
  templateUrl: './record-buttons.component.html',
  styleUrls: ['./record-buttons.component.css']
})
export class RecordButtonsComponent implements OnInit {
  @Input() selectedRecords: Record[] = [];

  @Output() OnClickAddNew: EventEmitter<any> = new EventEmitter();
  @Output() OnClickEdit: EventEmitter<any> = new EventEmitter();
  @Output() OnClickRemove: EventEmitter<any> = new EventEmitter();
  @Output() OnClickRefresh: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public addNew() {
    this.OnClickAddNew.emit();
  }

  public edit() { }
  public remove() { }
  public refresh() { }

  hasAnySelect() {
    return this.selectedRecords.length > 0;
  }

  isSingleSelect() {
    return this.selectedRecords.length === 1;
  }
}

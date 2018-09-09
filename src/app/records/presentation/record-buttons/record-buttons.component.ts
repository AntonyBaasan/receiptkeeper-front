import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-record-buttons',
  templateUrl: './record-buttons.component.html',
  styleUrls: ['./record-buttons.component.css']
})
export class RecordButtonsComponent implements OnInit {
  @Input() isSingleSelect: boolean;
  @Input() hasAnySelect: boolean;

  @Output() OnClickAddNew: EventEmitter<any> = new EventEmitter();
  @Output() OnClickEdit: EventEmitter<any> = new EventEmitter();
  @Output() OnClickRemove: EventEmitter<any> = new EventEmitter();
  @Output() OnClickRefresh: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public addNew() { }
  public edit() { }
  public remove() { }
  public refresh() { }

}

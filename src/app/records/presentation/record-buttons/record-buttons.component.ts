import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-record-buttons',
  templateUrl: './record-buttons.component.html',
  styleUrls: ['./record-buttons.component.css']
})
export class RecordButtonsComponent implements OnInit {
  @Input() isSingleSelect: boolean;
  @Input() hasAnySelect: boolean;
  constructor() { }

  ngOnInit() {
  }

  public addNew() { }
  public edit() { }
  public remove() { }
  public refresh() { }

}

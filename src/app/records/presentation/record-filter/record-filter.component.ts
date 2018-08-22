import { Component, OnInit, Input } from '@angular/core';
import { FilterInfo } from '../../../model/filter-info.model';
import { DateUtilsService } from '../../../services/date-utils.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-record-filter',
  templateUrl: './record-filter.component.html',
  styleUrls: ['./record-filter.component.css']
})
export class RecordFilterComponent implements OnInit {

  @Input() filterInfo: FilterInfo;

  constructor(
    public dateUtilsService: DateUtilsService,
    private datePipe: DatePipe
  ) { }


  ngOnInit() {
    this.filterInfo = this.filterInfo || {};
  }

  clearAll() {
    this.filterInfo = {};
  }

  clearDateFilter() {
    this.filterInfo.startDate = null;
    this.filterInfo.endDate = null;
  }

  clearTextFilter() {
    this.filterInfo.text = null;
  }

  clearTotalFilter() {
    this.filterInfo.minTotal = null;
    this.filterInfo.maxTotal = null;
  }

  public dateFiltersToString() {
    if (!this.filterInfo.startDate && !this.filterInfo.endDate) {
      return 'filters by date range';
    }

    let resultString = '';
    if (this.filterInfo.startDate) {
      resultString +=
        'from ' + this.datePipe.transform(this.filterInfo.startDate, 'MM/dd/yyyy');
    }
    if (this.filterInfo.endDate) {
      resultString +=
        ' until ' + this.datePipe.transform(this.filterInfo.endDate, 'MM/dd/yyyy');
    }

    return resultString;
  }

  startDateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    this.filterInfo.startDate = event.value;
  }

  endDateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    this.filterInfo.endDate = event.value;
  }

  convertDateToForm(date: Date) {
    return this.dateUtilsService.convertDateToForm(date);
  }
}

import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Record } from '../models/record.model';
import { FilterInfo } from '../../model/filter-info.model';
import { PageInfo } from '../../model/page-info.model';
import { Page } from '../../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private backendUrl = '';

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.backendUrl = environment.backendUrl + '/receipts';
  }

  getNewReceiptTemplate(): Record {
    return {
      id: null,
      title: '',
      // title: 'New title',
      // description: 'New description',
      // date: new Date(),
      // total: 0
    };
  }

  getRecords(
    pageInfo: Page<Record>, filterInfo: FilterInfo
  ): Observable<Page<Record>> {
    return this.http.get<any>(
      this.backendUrl +
      this.buildUrl(pageInfo, '?') +
      this.buildUrl(filterInfo, '&')
    );
  }

  private buildUrl(obj: any, prefix: string): string {
    const queryString = new URLSearchParams();
    for (const key in obj) {
      if (!_.isNil(obj[key])) {
        if (obj[key] instanceof Date) {
          queryString.set(key, this.datePipe.transform(obj[key], 'MM/dd/yyyy'));
        } else {
          queryString.set(key, obj[key]);
        }
      }
    }
    const result = queryString.toString();
    if (result) {
      return prefix + result;
    } else {
      return '';
    }
  }

  // this is destructive (recrates an object)
  save(receipt: Record) {
    if (receipt.id) {
      return this.http.put<Record>(this.backendUrl, receipt);
    } else {
      return this.http.post<Record>(this.backendUrl, receipt);
    }
  }

  remove(receipt: Record) {
    if (receipt && receipt.id) {
      return this.http.delete(this.backendUrl + '/' + receipt.id);
    }

    return Observable.throw(new Error('Invalid record!'));
  }

  // removeMany(receipts: Receipt[]) {
  //   _.forEach(receipts, r => {
  //     this.remove(r);
  //   });
  // }
}

import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IncrementCounters, DecrementCounters, ResetCounters } from '../actions/counter.actions';

interface AppState {
  counter: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  env: any = null;
  counter: Observable<number>;
  constructor(private store: Store<AppState>) {
    this.counter = store.select('counter');
  }

  ngOnInit() {
    this.env = environment;
  }

  increment() {
    this.store.dispatch(new IncrementCounters());
  }

  decrement() {
    this.store.dispatch(new DecrementCounters());
  }

  reset() {
    this.store.dispatch(new ResetCounters());
  }
}

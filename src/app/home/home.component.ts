import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET } from '../reducer/counter.reducer';

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
    this.store.dispatch({ type: INCREMENT });
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }
}

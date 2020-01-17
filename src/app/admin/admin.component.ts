import { Component, OnInit, Input } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { Store } from '@ngrx/store';
import { Order } from '../order/order.model';
import { Observable } from 'rxjs';


import * as orderActions from '../order/store/order.actions';
import * as fromOrder from '../order/store/order.reducer';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() index: number;

  orderList: Observable<{orderList: Order[]}>;

  constructor(
    private dsStorage: DataStorageService,
    private store: Store<fromOrder.AppState>) { }


  ngOnInit() {
    // this.orderList = this.dsStorage.orderList;
    this.orderList = this.store.select('order');
  }

}

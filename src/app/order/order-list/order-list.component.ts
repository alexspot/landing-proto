import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from '../../order/order.model';
import { Observable } from 'rxjs';


import * as orderActions from '../../order/store/order.actions';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  @Input() index: number;

  orderList: Observable<{orderList: Order[]}>;

  constructor(
    private store: Store<fromApp.AppState>)
    {}

  ngOnInit() {
    // this.orderList = this.dsStorage.orderList;
    this.orderList = this.store.select('order');
  }

  onUpdateClick(index: number) {
    // this.store.dispatch(new orderActions.startEdit(index));
  }

  onDeleteClick() {
    this.store.dispatch(new orderActions.deleteOrder(1));
  }

}

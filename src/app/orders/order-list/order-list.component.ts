import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from '../../orders/order.model';
import { Observable, Subscription } from 'rxjs';


import * as orderActions from '../../orders/store/order.actions';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  @Input() index: number;
  subscription: Subscription;

  orderList: Order[];
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new orderActions.getOrders());
    this.subscription = this.store
      .select('order')
      .pipe(map(orderStates => orderStates.orderList))
      .subscribe((orders: Order[]) => {
        this.orderList = orders;
      });
  }

  onUpdateClick(index: number) {
    // this.store.dispatch(new orderActions.startEdit(index));
  }

  onDeleteClick(index: number) {
    this.store.dispatch(new orderActions.deleteOrder(index));
    this.store.dispatch(new orderActions.storeOrders());
  }

  onFetchOrdersClick() {
    // this.store.dispatch(new orderActions.getOrders());
  }

  onStoreOrdersClick() {
    // this.store.dispatch(new orderActions.storeOrders());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

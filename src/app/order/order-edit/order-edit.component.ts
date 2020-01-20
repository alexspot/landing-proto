import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import * as fromOrder from '../../order/store/order.reducer';
import { Store } from '@ngrx/store';
import { Order } from '../order.model'
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as OrderActions from '../store/order.actions';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit, OnDestroy {

  editMode = false;
  editedItem: Order;
  id: number;
  // write logic to get index from url
  subscription: Subscription;

  orderForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    city: new FormControl(''),
    npAffiliate: new FormControl('')
  })

  constructor(private store: Store<fromOrder.AppState>, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });

    this.subscription = this.store.select('order').pipe(map(orderState => {
      return orderState.orderList.find((recipe, index) => {
        return index == this.id;
      })
    })).subscribe(order => {
      this.orderForm.setValue({
        firstName: order.firstName,
        lastName: order.lastName,
        phoneNumber: order.phoneNumber,
        city: order.city,
        npAffiliate: order.npAffiliate
      })

    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const value = this.orderForm.value;
    const newOrder = new Order(
      value.firstName,
      value.lastName,
      value.phoneNumber,
      value.city,
      value.npAffiliate,
      'new'
    )

    if (this.editMode) {
      this.store.dispatch(new OrderActions.updateOrder({index: this.id, order: newOrder}));
    }
  }
}

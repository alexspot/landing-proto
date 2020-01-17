import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import * as fromOrder from '../../order/store/order.reducer';
import { Store } from '@ngrx/store';
import { Order } from '../order.model'
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as OrderActions from '../store/order.actions';


@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit, OnDestroy {

  editMode = false;
  editedItem: Order;
  @ViewChild('orderForm', {static: false}) orderForm: NgForm;
  subscription: Subscription;

  // orderForm = new FormGroup({
  //   firstName: new FormControl('Иван'),
  //   lastName: new FormControl('Иванов'),
  //   phoneNumber: new FormControl('+380731234567'),
  //   city: new FormControl('Чернигов'),
  //   npAffiliate: new FormControl('Склад №2')
  // })

  constructor(private store: Store<fromOrder.AppState> ) { }

  ngOnInit() {
    this.subscription = this.store.select('order').subscribe(stateData => {
      if (stateData.editedOrderIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedOrder;
        this.orderForm.setValue({
          firstName: this.editedItem.firstName,
          lastName: this.editedItem.lastName,
          phoneNumber: this.editedItem.phoneNumber,
          city: this.editedItem.city,
          npAffiliate: this.editedItem.npAffiliate
        })

      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new OrderActions.stopEdit());
  }

}

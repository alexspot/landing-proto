import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataStorageService} from '../data-storage.service'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import { Order } from './order.model';

import * as orderActions from '../order/store/order.actions';
import * as fromOrder    from '../order/store/order.reducer';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  orderForm = new FormGroup({
    firstName: new FormControl('Иван'),
    lastName: new FormControl('Иванов'),
    phoneNumber: new FormControl('+380731234567'),
    city: new FormControl('Чернигов'),
    npAffiliate: new FormControl('Склад №2')
  })

  editMode = false;

  orders;

  constructor(
    private dsService: DataStorageService,
    private router: Router,
    // add type of order here too, array of
    private store: Store<fromOrder.AppState> 
    ) {}

  ngOnInit() {
    this.orders = this.store.select('order');
  }

  onSubmit(){
    const value = this.orderForm.value;
    const newOrder = new Order(
      value.firstName,
      value.lastName,
      value.phoneNumber,
      value.city,
      value.npAffiliate,
      'New'
    )

    if (this.editMode) {

    } else {
      this.store.dispatch(new orderActions.createOrder(newOrder));
      this.router.navigate(['/thank-you']);
    }

    this.editMode = false;
  }

}

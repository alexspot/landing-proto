import { Order } from '../order.model';
import * as orderActions from '../../orders/store/order.actions';
import * as fromOrder    from '../../orders/store/order.reducer';
import * as fromApp      from '../../store/app.reducer';
import { Product } from 'src/app/products/product.model';

import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainPageComponent } from 'src/app/main-page/main-page.component';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() index: number;

  @ViewChild(MainPageComponent, {static: false}) selectedProductColor;

  get productControls(){
    return (this.orderForm.get('products') as FormArray).controls;
  }

  orderForm = new FormGroup({
    firstName: new FormControl('Иван'),
    lastName: new FormControl('Иванов'),
    phoneNumber: new FormControl('+380731234567'),
    city: new FormControl('Чернигов'),
    npAffiliate: new FormControl('Склад №2'),
    products: new FormControl(''),
    color: new FormControl('')
  })

  selectedProduct;
  selectedProductId: number;
  subscription: Subscription;

  editMode = false;

  orders;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedProductId = params['id'];
    });

    this.subscription = this.store.select('product').pipe(map(productState => {
      return productState.productList.find((p, i) => {
        return i == this.selectedProductId;
      })
    })).subscribe(product => {
      this.selectedProduct = product;
    })

    console.log(this.selectedProduct);
    this.orderForm.patchValue({products: this.selectedProduct.title})
  }

  ngAfterViewInit() {
    console.log(this.selectedProductColor);
  }

  onSubmit(){
    const value = this.orderForm.value;
    const newOrder = new Order(
      value.firstName,
      value.lastName,
      value.phoneNumber,
      value.city,
      value.npAffiliate,
      'New',
      this.selectedProduct,
      value.color,
      new Date(Date.now()).toLocaleString()
    )

    if (this.editMode) {

    } else {
      this.store.dispatch(new orderActions.createOrder(newOrder));
    }

    this.editMode = false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

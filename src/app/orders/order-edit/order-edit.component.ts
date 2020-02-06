import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Order } from '../order.model'
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as OrderActions from '../store/order.actions';
import * as ProductActions from '../../products/store/product.actions';
import * as fromApp from '../../store/app.reducer';
import { Product } from 'src/app/products/product.model';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})

export class OrderEditComponent implements OnInit, OnDestroy {
  editMode = false;
  editedItem: Order;
  id: number;
  editedItemCreatedTime: string;
  // write logic to get index from url
  orderSubscription: Subscription;
  productSubscription: Subscription;
  productSelectSubscription: Subscription;

  productColors: string[];
  product: Product; 
  productList: Product[];
  selectedProduct: Product;

  orderForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    city: new FormControl(''),
    npAffiliate: new FormControl(''),
    productTitle: new FormControl(''),
    color: new FormControl('')
  })

  constructor(private store: Store<fromApp.AppState>, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });

    this.store.dispatch(new ProductActions.getProducts());
    this.productSubscription = this.store.select('product').pipe(
      map(productState => {
        return productState.productList
      })).subscribe(products => {
      this.productList = products;
    })

    this.orderSubscription = this.store.select('order').pipe(map(orderState => {
      return orderState.orderList.find((order, index) => {
        return index == this.id;
      })
    })).subscribe(order => {
      this.productColors = order.product.colors;
      this.product = order.product;
      this.orderForm.setValue({
        firstName: order.firstName,
        lastName: order.lastName,
        phoneNumber: order.phoneNumber,
        city: order.city,
        npAffiliate: order.npAffiliate,
        productTitle: order.product.title,
        color: order.productColor
      })
      // save created time in separate var. Maybe there is more elegant way of doing so
      this.editedItemCreatedTime = order.createTime;
    });
  }

  onSelect() {
    const selectedProductTitle = this.orderForm.value.productTitle;

    this.productSelectSubscription = this.store.select('product').pipe(
      map((productState) => {
        return productState.productList.find((product, index) => {
          return product.title == selectedProductTitle;
        })
      })).subscribe(product => {
        this.selectedProduct = product;
      })

    this.productColors = this.selectedProduct.colors;
    console.log(this.productColors);
    // #TODO fix this error by adding type (model) COLOR
    this.orderForm.patchValue({color: this.productColors[0].name});
  }

  onSubmit() {
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
      this.editedItemCreatedTime
    )

    if (this.editMode) {
      this.store.dispatch(new OrderActions.updateOrder({index: this.id, order: newOrder}));
      this.store.dispatch(new OrderActions.storeOrders());
    }
  }

  ngOnDestroy(){
    this.orderSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
    this.productSelectSubscription.unsubscribe();
  }
}

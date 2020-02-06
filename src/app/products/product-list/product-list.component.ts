import * as fromApp from '../../store/app.reducer';
import * as ProductActions from '../store/product.actions';

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from '../product.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  @Input() index: number;
  subscription: Subscription;

  productList: Product[];

  constructor( private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new ProductActions.getProducts());
    this.subscription = this.store.select('product').pipe(
      map(productStates => productStates.productList))
      .subscribe((products: Product[]) => {
      this.productList = products;
    })
    // this.productList = this.store.select('product');
  }

  onUpdateClick(i) {
  }

  onStoreProductsClick() {
    this.store.dispatch(new ProductActions.storeProducts());
  }

  onDeleteClick(index: number) {
    this.store.dispatch(new ProductActions.deleteProduct(index));
    this.store.dispatch(new ProductActions.storeProducts());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

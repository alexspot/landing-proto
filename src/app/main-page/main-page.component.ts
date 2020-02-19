import { Product } from '../products/product.model';
import * as fromApp from '../store/app.reducer';
import * as ProductActions from '../products/store/product.actions';

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit, OnDestroy {
  
  subscription: Subscription;
  productList: Product[];
  
  @Input() selectedProductColor: string;
  images = [
    'https://hydrotherapy.com.ua/images/shutterstock_6910224122.jpg.pagespeed.ce.KKlYOLl-RP.jpg',
    'https://hydrotherapy.com.ua/images/xslider.jpg.pagespeed.ic.JqYrFMa8pB.webp',
    'https://hydrotherapy.com.ua/images/xshutterstock_65678896.jpg.pagespeed.ic.BgP0tZGzZ7.webp'
  ]

  constructor( private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new ProductActions.getProducts());
    this.subscription = this.store.select('product').pipe(
      map(productStates => productStates.productList))
      .subscribe((products: Product[]) => {
      this.productList = products;
    })
    console.log(this.productList);
    // this.productList = this.store.select('product');
  }

  onBuyClick(event) {
    // this.selectedProductColor;
    // console.log(event)
  }

  onColorSelectClick(event) {
    this.selectedProductColor = event.srcElement.value
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

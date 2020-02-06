import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from '../product.model';
import * as fromApp from '../../store/app.reducer';
import * as ProductActions from '../store/product.actions';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit, OnDestroy {

  productForm = new FormGroup({
    title:       new FormControl(''),
    description: new FormControl(''),
    price:       new FormControl(''),
    imagePath:   new FormControl(''),
    colors:      new FormControl('')
  })

  editedProduct: Product;
  id: number;
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
    })

    this.subscription = this.store.select('product').pipe(
      map(productState => {
        return productState.productList.find((item, index) => {
          return index == this.id;
        })
      })).subscribe(product => {
        this.editedProduct = product;
        this.productForm.setValue({
          title:       product.title,
          description: product.description,
          price:       product.price,
          imagePath:   product.image,
          colors:      product.colors
        });
      }
    );
  }

  onSubmit() {
    const value = this.productForm.value;
    const newProduct = new Product(value.title, value.description, value.price, value.imagePath, value.color);

    this.store.dispatch(new ProductActions.updateProduct({index: this.id, product: newProduct}));
    this.store.dispatch(new ProductActions.storeProducts());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

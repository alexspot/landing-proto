import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as productActions from '../store/product.actions';
import { Product }  from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm =  new FormGroup({
    title:       new FormControl('Some product title'),
    description: new FormControl('Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet'),
    price:       new FormControl('23'),
    imagePath:   new FormControl('http://cheb-room.ru/uploads/cheb/2016/11/w9RC4W-QqXw-200x200.jpg'),
    colors:      new FormArray([])
  })

  constructor(private store: Store<fromApp.AppState>) { }

  get colorsControls() {
    return (this.productForm.get('colors') as FormArray).controls;
  }

  ngOnInit() {}

  onSubmit() {
    const value = this.productForm.value;
    const newProduct = new Product(
      value.title,
      value.description,
      +value.price,
      value.imagePath,
      value.colors
    );

    this.store.dispatch(new productActions.createProduct(newProduct));
  }

  onAddColor() {
    (<FormArray>this.productForm.get('colors')).push(
      new FormGroup({
        name: new FormControl(null),
      })
    );
  }

  onDeleteColor(index: number) {
    (<FormArray>this.productForm.get('colors')).removeAt(index);
  }

}

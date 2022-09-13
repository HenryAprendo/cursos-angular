import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  {

  constructor() { }

  @Input() product: Product = {
    //Inicialización de product
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: '',
      typeImg: '',
    }
  }

  @Output() addedProduct = new EventEmitter<Product>();

  @Output() showProduct = new EventEmitter<string>();

  onAddToCar() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }

}













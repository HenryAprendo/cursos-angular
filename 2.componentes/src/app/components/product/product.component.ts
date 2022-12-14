import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product.model';

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
    image: '',
    description: '',
    category: ''
  }

  @Output() addedProduct = new EventEmitter<Product>();

  onAddToCar() {
    this.addedProduct.emit(this.product);
  }


}













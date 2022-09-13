import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];

  //Creación de un observable
  private myCart = new BehaviorSubject<Product[]>([]);

  //Suscriptor y exponemos un observable
  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getTotal() {
    return this.myShoppingCart.reduce( (sum, item) => sum + item.price, 0);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

}

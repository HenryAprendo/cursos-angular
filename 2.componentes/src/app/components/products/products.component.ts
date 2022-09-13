import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  today = new Date();
  date = new Date(2021,1,22);

  constructor(
    private storeServices: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeServices.getShoppingCart();
  }

  products: Product[] = [

  ]

  ngOnInit(): void {
    this.productsService.getAllproducts().subscribe( data => {
      this.products = data;
    });
  }

  onAddToShoppingCar(product: Product) {
    this.storeServices.addProduct(product);
    this.total = this.storeServices.getTotal();
  }

}















import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  limit:number = 10;
  offset:number = 0;

  products: Product[] = [];
  productId: string|null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productsService.getAll(this.limit, this.offset)
    .subscribe( data => {
      this.products = data;
      this.offset += this.limit;
    });

    this.route.queryParamMap.subscribe( params => {
      this.productId = params.get('product');
      console.log(this.productId);
    })
  }

  onLoadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe( data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }


}

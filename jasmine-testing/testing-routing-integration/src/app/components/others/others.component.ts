import { Component, OnInit } from '@angular/core';
import { Product } from './../../models/product.model';
import { ProductsService }  from './../../services/product.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {

  color = 'yellow';
  text = 'Un texto';

  products: Product[] = [];

  constructor(private productService: ProductsService) { }

  //verificación de que con las pruebas de integración ejecuta los componentes reales
  ngOnInit(): void {

    this.productService.getAll().subscribe( (data: Product[]) => {
      this.products = data;
    })

    console.log('Render OthersComponent Real from testing');
  }

}

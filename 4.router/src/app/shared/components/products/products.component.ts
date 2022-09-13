import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total = 0;
  today = new Date();
  date = new Date(2021,1,22);

  @Input() products: Product[] = [];
  @Input()
  set productId(id:string|null) {
    if(id){
      this.onShowDetails(id);
    }
  }
  @Output() loadMore = new EventEmitter();

  limit: number = 10;
  offset: number = 0;
  statusDetails: 'loading' | 'success' | 'error' | 'init' = 'init';

  showProductDetails = false;

  productChosen: Product = {
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

  constructor(
    private storeServices: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeServices.getShoppingCart();
  }

  onAddToShoppingCar(product: Product) {
    this.storeServices.addProduct(product);
    this.total = this.storeServices.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetails = !this.showProductDetails;
  }

  onShowDetails(id:string) {
    this.statusDetails = 'loading';
    if(!this.showProductDetails){
      this.showProductDetails = true;
    }
    this.productsService.getProduct(id)
    .subscribe({
      next: (data) => {
        this.productChosen = data;
        this.statusDetails = 'success';
      },
      error: (errorMsg) => {
        console.log(errorMsg);
        this.statusDetails = 'error';
      }
    })

  }

  readAndUpdate(id:string) {
    //Este metedo implementa switchMap en el servicio
    this.productsService.fetchReadAndUpdateSwitch(id,{price: 1300})
    .subscribe( data => console.log(data));

    //Este metedo implementa zip en el servicio
    this.productsService.fetchReadAndUpdate(id,{title: 'new change'})
    .subscribe( response => {
      const read = response[0];
      const update = response[1];
    });
  }


  createNewProduct() {

    const newProduct: CreateProductDTO = {
      title: 'nuevo product',
      price: 100,
      images: [
        "https://placeimg.com/640/480/tech?r=0.031272221741108996",
        // "https://placeimg.com/640/480/tech?r=0.1562642693682763",
        // "https://placeimg.com/640/480/tech?r=0.19973827299605484"
      ],
      description: 'Esto es un producto electronic',
      categoryId: 2
    }

    this.productsService.create(newProduct)
    .subscribe(data => {
      this.products.unshift(data);
    });
  }


  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Intelligent Soft Tuna'
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe( data => {
      const productIndex = this.products.findIndex( item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe( () => {
      const productIndex = this.products.findIndex( item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetails = false;
    });
  }

  loadMoreProduct() {
    this.loadMore.emit();
  }

}















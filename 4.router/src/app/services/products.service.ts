import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { retry, catchError, map, switchMap } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { checkTime } from '../interceptors/time.interceptor';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api`;

  constructor(
    private http: HttpClient
  ) {

  }

  getByCategory(limit:number, offset:number, categoryId:string) {
    let params = new HttpParams();
    if(limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params})
    .pipe(
      retry(3),
      map( products => products.map( item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    )

  }

  getAll(limit?:number, offset?:number) {
    let params = new HttpParams();
    if(limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
    .pipe(
      retry(3),
      map( products => products.map( item => {
        return {
          ...item,
          taxes: .19 * item.price
          //transformando el producto, agregando la propiedad taxes
        }
      }))
    )
  }

  getProduct(id:string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError( (error:HttpErrorResponse) => {

        if(error.status === HttpStatusCode.Conflict) {
          return throwError( () => new Error('Algo esta fallando en le server') );
        }

        if(error.status === HttpStatusCode.NotFound) {
          return throwError( () => new Error('El producto no existe') );
        }

        if(error.status === HttpStatusCode.Unauthorized) {
          return throwError( () => new Error('No estas autorizado') );
        }

        return throwError( () => new Error('Ups algo salio mal') );

      })
    )
  }

  getProductsByPage(limit:number, offset:number) {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: {
        limit,
        offset
      }
    });
  }


  //Evitando el callback hell al hacer peticiones en la que una depende de la respuesta de la otra utilizando switchMap y Zip de lib. rxjs
  fetchReadAndUpdateSwitch(id:string, dto: UpdateProductDTO) {
    return this.getProduct(id)
    .pipe(
      switchMap( product => this.update(product.id, dto))
    )
  }

  fetchReadAndUpdate(id:string, dto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    );
  }

  create(dto:CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id:string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id:string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }

}




















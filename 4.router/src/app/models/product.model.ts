export interface Category {
  id: string;
  name: string;
  typeImg: string;
}

export interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
  description: string;
  category: Category;
  taxes?: number;     //Atributo agregado y calculado en el frontend, aplicando transformación con el operador map desde el servicio
}

// Implementando DTO Data Transfer Object con las utility type.

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}


export interface UpdateProductDTO extends Partial<CreateProductDTO> { }



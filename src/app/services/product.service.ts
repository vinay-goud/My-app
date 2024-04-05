import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import productData from '../../assets/products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(): Product[] {
    return productData as Product[];
  }
}
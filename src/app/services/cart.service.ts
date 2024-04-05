import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { [key: string]: number } = {};

  addToCart(product: Product) {
    if (this.cartItems[product.name]) {
      this.cartItems[product.name]++;
    } else {
      this.cartItems[product.name] = 1;
    }
  }

  removeFromCart(product: Product) {
    if (this.cartItems[product.name]) {
      if (this.cartItems[product.name] === 1) {
        delete this.cartItems[product.name];
      } else {
        this.cartItems[product.name]--;
      }
    }
  }

  getCartItems() {
    return this.cartItems;
  }
}
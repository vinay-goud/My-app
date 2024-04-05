/*import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

}
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [DatePipe]
})
export class CartComponent implements OnInit {
  products: Product[];
  cartItems: { [key: string]: number } = {};
  //estimatedDeliveryDate!: Date;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {
    this.products = this.productService.getProducts();
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    //this.estimatedDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
  }

  getProductPrice(name: string): number {
    const product = this.products.find(p => p.name === name);
    return product ? product.price : 0;
  }

  getProductByName(name: string): Product {
    return this.products.find(p => p.name === name)!;
  }

  getOrderTotal(): number {
    return Object.keys(this.cartItems).reduce((total, name) => {
      const product = this.products.find(p => p.name === name);
      return total + (product?.price || 0) * this.cartItems[name];
    }, 0);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems();
  }

  checkout() {
    this.router.navigate(['/confirm-order'], {
      state: { cartItems: this.cartItems }
    });
  }
}

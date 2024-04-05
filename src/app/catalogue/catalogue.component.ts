/*import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent {

}
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  products: Product[] = [];
  cartItems: { [key: string]: number } = {};

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.cartItems = this.cartService.getCartItems();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems();
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
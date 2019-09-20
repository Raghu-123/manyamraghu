import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
products: Product[] = [];
filteredProducts: Product[] = [];
category: string;
cart: any;
subscription: Subscription
  constructor( route: ActivatedRoute,
               private productSerivce: ProductService,
               private shoppingCart: ShoppingCartService
                ) {
   productSerivce.getAll<Product>().pipe(switchMap(products => {
    this.products = products;
    return route.queryParamMap;
  }))
      .subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) : this.products;
          });
    } 

    /* constructor(productService:ProductService, private route:ActivatedRoute) { 
      productService.getAll<Product>().pipe(switchMap(x => {
        this.products = x;
        return route.queryParamMap})).subscribe(params => { this.category = params.get('category');
        this.filteredProducts = (this.category) ? this.products.filter(p => p.payload.val().category === this.category) : this.products;
      });
    } */

  async ngOnInit() {
   this.subscription = ( await this.shoppingCart.getCart())
      .snapshotChanges().subscribe(cart => this.cart = cart.payload.val());
  }
  ngOnDestroy() {
this.subscription.unsubscribe();
  }

}

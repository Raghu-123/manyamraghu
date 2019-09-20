import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/product';
//import 'rxjs/add/operator/take';
import { take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
   return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId(): Promise<string> {

    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    } else {
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
}
  }

  async addToCart(product: Product) {
this.updateItemQuantity(product,1);
  }
  async removeFromCart(product: Product) {
this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
      console.log('product value is ' + i.payload.val());
      if (i.payload.val()) {
        item$.update({ quantity: (i.payload.val().quantity) + change });
      } else {
        item$.set({
          product: product,
          quantity: 1 });
      }

      /* console.log("auantity after"+i.quantity)
      item$.update({
        product: product,
        quantity: (i.quantity || 0) + 1
      });
      console.log("auantity after"+i.quantity) */
    });
  }
}
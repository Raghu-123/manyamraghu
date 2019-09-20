import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  adminproductdata: Observable<any[]>;
   adminProductdata: AngularFireList<any>;
constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }
  getAll<T>() {
    return this.db.list<T>('/products').snapshotChanges().pipe(
      map(a =>
        a.map( p => {
            const value =  Object.assign({}, p.payload.val()) as any;
            value.key = p.key;
            return  value as T;
          }
      ))
    );
  }
  /* getAll<T>() {

return this.db.list('/products').snapshotChanges().pipe(map(changes =>
  { return changes.map(c => ({key: c.payload.key, ...c.payload.val()
  }))}));
  } */
  get(productId) {
    console.log('productid: = ' + productId);
    return this.db.object('/products/' + productId);
  }
  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }
  delete(productId) {
    return this.db.object('/products/' + productId).remove();

  }
}

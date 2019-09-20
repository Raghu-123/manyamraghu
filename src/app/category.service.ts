import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase,
              ) { }

  getAll() {
   return this.db.list('/categories', ref => {
     return ref.orderByChild('name');
   }).snapshotChanges();
  //  valueChanges().subscribe(catgeories => {
  //   catgeories.sort();
  // });
  }
}

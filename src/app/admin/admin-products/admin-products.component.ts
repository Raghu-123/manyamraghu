import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { DataTableResource } from 'angular7-data-table';
// import {map} from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  // filteredProducts: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  constructor(private productService: ProductService) {
this.subscription = this.productService.getAll<Product>()
.subscribe(products => {
  this.products = products;
  this.initializeTable(products);
});
/* .pipe(map(
  product => {
    return  {
                   title: product.payload.val().title,
                   category: product.payload.val().category,
                   imageUrl: product.payload.val().imageUrl,
                   price: product.payload.val().price,
                   key: product.key
    } as Product;
  }
))); */
console.log(this.products);
   }
   private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
    .then(items => this.items = items);
    this.tableResource.count().
    then(count => this.itemCount = count);
    }
ngOnDestroy() {
  this.subscription.unsubscribe();
}
  ngOnInit() {
  }
filter(query: string) {
const filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
this.products;
this.initializeTable(filteredProducts);
}
reloadItems(params) {
  if (!this.tableResource) { return; }
  this.tableResource.query(params)
  .then(items => this.items = items);
}

}

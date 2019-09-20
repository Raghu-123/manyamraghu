import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
// import 'rxjs/add/operator/take';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories: Observable<any>;
  product = {};
  id;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService ) {
    this.categories = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) { this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p ); }
    console.log('product :' + this.product);
  }

  ngOnInit() {
  }
save(product) {
  if (this.id) {
   this.productService.update(this.id, product);
  } else {
  console.log(product);
  this.productService.create(product);
}
  this.router.navigate(['/admin/products']);
}
delete() {
  if (confirm('Are you sure yuo want to delete this product?'))
{
this.productService.delete(this.id);
this.router.navigate(['/admin/products']);
}
}

}

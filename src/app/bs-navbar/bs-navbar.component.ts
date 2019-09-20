import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  implements OnInit {
  appUser: AppUser;
  user$: Observable<firebase.User>;
  shoppingCartItemCount: number;
  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth, private shoppingCartService: ShoppingCartService ) {
      
    }
  logout() {
    this.authService.logout();
  }
  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    this.user$ = this.afAuth.authState;
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
// tslint:disable-next-line: forin
     for(let productId in cart.items) {
       this.shoppingCartItemCount += cart.items[productId].quantity;
     }
    });
  }

}

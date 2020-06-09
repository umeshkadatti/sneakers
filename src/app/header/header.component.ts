import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ShopService } from '../shop/shop.service';
import { AuthService } from '../auth.service';
import { CartService } from '../shop/cart/cart.service';
import { AuthGuard } from './../auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private shopServie: ShopService, private authService: AuthService, private cartService: CartService, private authGuardService: AuthGuard) { }

  isLogIn = true;
  noOfItems = null;

  ngOnInit() {
    this.authGuardService.length.subscribe(length=>{
      this.noOfItems = length;
    });
    this.cartService.noOfItems.subscribe(no=>{
      this.noOfItems = no;
    });
  }

  onLogIn(){
  	this.isLogIn = !this.isLogIn;
  	if(this.isLogIn){
  		this.authService.logOut();
      this.router.navigate(['/']);
  	} else{
  		this.authService.logIn();
  	}
  	
  }

  onChoose(type: string){
  	this.router.navigate(['shop', type], { relativeTo: this.route});
  }

  onClick(){
  	this.router.navigate(['shop/view-cart']);
  }

}

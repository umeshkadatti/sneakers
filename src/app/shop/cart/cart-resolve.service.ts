import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { CartService } from './cart.service';
import { CartShoeModel } from './cart-shoe.model';
import { CartStorageService } from './cart-storage.service';

@Injectable({
	providedIn: 'root'
})

export class CartResolveService implements Resolve<CartShoeModel[]>{

	constructor(private cartService: CartService, private cartDataService: CartStorageService){
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		let cartItems = this.cartService.cartItems;
		if(cartItems.length == 0){
			return this.cartDataService.fetchCartItems();
		} else {
			return cartItems;
		}
	}	
}
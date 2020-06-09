import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {Observable} from 'rxjs';

import { AuthService } from './auth.service';
import { CartStorageService } from './shop/cart/cart-storage.service';

@Injectable()
export class AuthGuard implements CanActivate{

	length = new Subject<number>();

	constructor(private authService: AuthService, private router: Router, private cartDataService: CartStorageService){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
		return this.authService.isAuthenticated().then((authenticated: boolean) =>{
			if(authenticated){
				this.cartDataService.fetchCartItems().subscribe(cartItems=>{
					let totalQty = 0;
					for(let item of cartItems){
						totalQty += item.noOfItems; 
					}
					this.length.next(totalQty);
				});
				return true;
			} else {
				this.router.navigate(['/']);
			}
		})
	}
}
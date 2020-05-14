import { Injectable } from '@angular/core';

import { CartShoeModel } from './cart-shoe.model';

@Injectable({
	providedIn : 'root'
})

export class CartService{

	cartItems: CartShoeModel[] = [];
	
}
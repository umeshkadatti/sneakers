import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CartShoeModel } from './cart-shoe.model';

@Injectable({
	providedIn : 'root'
})

export class CartService{

	cartItemChanged = new Subject<CartShoeModel[]>();
	noOfItems = new Subject<number>();

	cartItems: CartShoeModel[] = [];

	constructor(){}

	fetchItems(itmes: CartShoeModel[]){
		this.cartItems = itmes || []; // if items are zero use this assignment "error: Cannot read property 'push' of null at Component"
		this.cartItemChanged.next(this.cartItems.slice());
	}

	removeCartItem(i: number){
		this.cartItems.splice(i, 1);
		this.itemQuantity();
		this.cartItemChanged.next(this.cartItems.slice());
	}

	itemQuantity(){
		let totalqty = 0;
		for(let item of this.cartItems){
        totalqty += item.noOfItems;
      }
      console.log(totalqty);
      this.noOfItems.next(totalqty);
      totalqty = 0;
	}
	
}
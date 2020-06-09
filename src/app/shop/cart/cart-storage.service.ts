import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { CartService } from './cart.service';
import { CartShoeModel } from './cart-shoe.model';

@Injectable({
	providedIn: 'root'
})

export class CartStorageService{

	constructor(private http: HttpClient, private cartService: CartService){}

	addCartItem(){
		let items = this.cartService.cartItems;
		this.http.put('https://sneakers-2ec6b.firebaseio.com/cartitems.json', items).subscribe(items=>{
		});
	}

	fetchCartItems(){
		return this.http.get<CartShoeModel[]>('https://sneakers-2ec6b.firebaseio.com/cartitems.json').pipe( tap(items => {
			this.cartService.fetchItems(items);
		}))
	}

	deleteCartItem(id: number){
		return this.http.delete('https://sneakers-2ec6b.firebaseio.com/cartitems/'+id + '.json');
	}	
}







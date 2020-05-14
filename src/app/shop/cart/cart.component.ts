import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CartService } from './cart.service';
import { CartShoeModel } from './cart-shoe.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	@Input() cartShoe: CartShoeModel;
	items: CartShoeModel[] ;

	constructor(private router: Router, private route: ActivatedRoute, private cartService: CartService){
	}

  ngOnInit() {
  	this.items = this.cartService.cartItems;
  }

  onClickItem(id: number, group: string){
  	this.router.navigate(['shop', group, id]);
  }

  removeItem(index: number){
    this.cartService.cartItems.splice(index, 1);
  }

  onClose(){
    this.router.navigate(['shop', 'men']);
  }

  viewCart(){
    this.router.navigate(['shop/view-cart']);
  }

}
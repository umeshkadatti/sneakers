import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

import { CartService } from '../cart/cart.service';
import { CartShoeModel } from '../cart/cart-shoe.model';
import { CartStorageService } from '../cart/cart-storage.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit{

	viewItems: CartShoeModel[];
  formDetail: number;

  constructor(private cartService: CartService, private cartDataService: CartStorageService) {
  }

  ngOnInit() {
  	this.viewItems  = this.cartService.cartItems;
  }

  onEnter(i, items){
    console.log(i, items);
    this.viewItems[i];
  }

  onRemove(index: number){
  	//this.cartService.cartItems.splice(index, 1);
    this.cartDataService.deleteCartItem(index).subscribe(()=>{
      this.cartService.removeCartItem(index);
      this.cartDataService.addCartItem();
    });
  }

}

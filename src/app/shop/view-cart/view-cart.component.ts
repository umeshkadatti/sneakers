import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { CartShoeModel } from '../cart/cart-shoe.model';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit{

	viewItems: CartShoeModel[];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
  	this.viewItems  = this.cartService.cartItems;
  }

  onEnter(i, items){
    console.log(i, items);
    this.viewItems[i].noOfItems;
  }

  onRemove(index: number){
  	this.cartService.cartItems.splice(index, 1);
  }

}

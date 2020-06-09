import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CartService } from './cart.service';
import { CartShoeModel } from './cart-shoe.model';
import { CartStorageService } from './cart-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	items: CartShoeModel[] = [];
  totalqty: number = 0;

	constructor(private router: Router, private route: ActivatedRoute, private cartService: CartService, private cartDataService: CartStorageService){
	}

  ngOnInit() {
    this.items = this.cartService.cartItems;
    this.cartService.cartItemChanged.subscribe(items=>{
      this.items = items;
    });
    this.cartService.itemQuantity();
    // for(let item of this.items){
    //     this.totalqty += item.noOfItems;
    //   }
    //   console.log(this.totalqty);
    //   this.cartService.noOfItems.next(this.totalqty);
    //   this.totalqty = 0;
  }

  onClickItem(id: number, group: string){
  	this.router.navigate(['shop', group, id]);
  }

  removeItem(index: number){
    this.cartDataService.deleteCartItem(index).subscribe(()=>{
      this.cartService.removeCartItem(index);
      this.cartDataService.addCartItem();
    });
    // this.cartDataService.fetchCartItems().subscribe(items=>{
    //   this.items = items;
    // });
    // this.cartService.cartItems.splice(index, 1);
  }

  onClose(){
    this.router.navigate(['shop', 'men']);
  }

  viewCart(){
    this.router.navigate(['shop/view-cart']);
  }

}
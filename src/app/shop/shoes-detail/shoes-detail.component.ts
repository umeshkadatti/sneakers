import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ShopService } from '../shop.service';
import { ShoeModel } from '../../shared/shoe.model';
import { CartShoeModel } from '../cart/cart-shoe.model';
import { CartService } from '../cart/cart.service';
import { CartStorageService } from '../cart/cart-storage.service';

@Component({
  selector: 'app-shoes-detail',
  templateUrl: './shoes-detail.component.html',
  styleUrls: ['./shoes-detail.component.css']
})
export class ShoesDetailComponent implements OnInit {

	shoe: ShoeModel;
	id: number;
  index: number;
  passArray: ShoeModel[];
  mainImage: string;
  qty: number = 1;
  group: string;
  constructor(private shopService: ShopService, public route: ActivatedRoute, private router: Router, private cartService: CartService, private cartDataServie: CartStorageService) { }

  ngOnInit() {
  	this.id = +this.route.snapshot.params['prodid'];
  	this.shoe = this.shopService.getShoe(this.id);
    this.mainImage = this.shoe.imagePath;
    this.route.params.subscribe((params: Params)=>{
      this.shoe = this.shopService.getShoe(params.prodid);
      this.mainImage = this.shoe.imagePath;
      this.group = params.cat;
    });
  }

  changeImage(imagePath: string){
    this.mainImage = imagePath;
  }

  addToCart(size: number){
    this.cartService.cartItems.push({cartItemId: this.shoe.prodId, cartItemGroup: this.shoe.group,cartItemName: this.shoe.itemName, cartImagePath: this.shoe.imagePath, cartItemPrice: this.shoe.prize, cartItemSize: size, cartItemColor: this.shoe.color, noOfItems: this.qty});
    this.cartDataServie.addCartItem();
    this.router.navigate(['shop/cart']);
  }

  // next item

  onNext(){
//    this.id = +this.route.snapshot.params['prodid'];
    // this.gender = this.route.snapshot.params['cat'];
    // this.shoe = this.shopService.getNextShoe(this.gender);
    // this.mainImage = this.shoe.imagePath;
   // this.index = this.shopService.shoes.indexOf(this.shoe);
   //  let nextid = this.shopService.shoes[this.index + 1].prodId;
   //  this.router.navigate(['../', nextid], {relativeTo: this.route});
   //  console.log(nextid);
    this.route.params.subscribe((params: Params)=>{
    //  this.shoe = this.shopService.getNextShoe(params.prodid);
      this.mainImage = this.shoe.imagePath;
    });
  }

  // previous item

  onPrev(){
    this.id = +this.route.snapshot.params['prodid'];
    this.index = this.shopService.shoes.indexOf(this.shoe);
    let nextid = this.shopService.shoes[this.index - 1].prodId;
    this.router.navigate(['../', nextid], {relativeTo: this.route});
    console.log(nextid);
    this.route.params.subscribe((params: Params)=>{
      this.shoe = this.shopService.getShoe(params.prodid);
      this.mainImage = this.shoe.imagePath;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ShopService } from '../shop.service';
import { ShoeModel } from '../../shared/shoe.model';
import { CartShoeModel } from '../cart/cart-shoe.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-shoes-detail',
  templateUrl: './shoes-detail.component.html',
  styleUrls: ['./shoes-detail.component.css']
})
export class ShoesDetailComponent implements OnInit {

	shoe: ShoeModel;
	id: number;
  next: number;
  prev: number;
  index: number;
  passArray: ShoeModel[];
  mainImage: string;
  qty: number = 1;
  constructor(private shopService: ShopService, public route: ActivatedRoute, private router: Router, private cartService: CartService) { }

  ngOnInit() {
  	this.id = +this.route.snapshot.params['prodid'];
  	this.shoe = this.shopService.getShoe(this.id);
    this.mainImage = this.shoe.imagePath;
    this.route.params.subscribe((params: Params)=>{
      this.shoe = this.shopService.getShoe(params.prodid);
      this.mainImage = this.shoe.imagePath;
    });
  }

  changeImage(imagePath: string){
    this.mainImage = imagePath;
  }

  onNext(){
    this.id = +this.route.snapshot.params['prodid'];
    this.index = this.shopService.shoes.indexOf(this.shoe);
    let nextid = this.shopService.shoes[this.index + 1].prodId;
    this.router.navigate(['../', nextid], {relativeTo: this.route});
    console.log(nextid);
    this.route.params.subscribe((params: Params)=>{
      this.shoe = this.shopService.getShoe(params.prodid);
      this.mainImage = this.shoe.imagePath;
    });
  }

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

  addToCart(size: number){
    this.router.navigate(['shop/cart']);
    this.cartService.cartItems.push({cartItemId: this.shoe.prodId, cartItemGroup: this.shoe.group,cartItemName: this.shoe.itemName, cartImagePath: this.shoe.imagePath, cartItemPrice: this.shoe.prize, cartItemSize: size, cartItemColor: this.shoe.color, noOfItems: this.qty});
  }

}

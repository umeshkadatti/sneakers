import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ShopService } from '../shop/shop.service';
import { ShoeModel } from './../shared/shoe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private shopService: ShopService, private router: Router, private route: ActivatedRoute) { }

  shoes: ShoeModel[];

  ngOnInit() {
  	this.shoes = this.shopService.getShoes();
  }

  onChoose(type: string){
  	this.router.navigate(['shop', type], { relativeTo: this.route });
  }

}

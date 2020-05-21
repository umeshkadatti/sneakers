import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ShopService } from '../shop.service';
import { ShoeModel } from '../../shared/shoe.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

	items: ShoeModel[];

  constructor(private shopService: ShopService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.items = this.shopService.getShoes();
  }

  onAdd(){
  	this.router.navigate(['new'], {relativeTo: this.route});
  }

}

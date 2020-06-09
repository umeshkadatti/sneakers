import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ShopService } from '../shop.service';
import { ShoeModel } from '../../shared/shoe.model';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-shoes-list',
  templateUrl: './shoes-list.component.html',
  styleUrls: ['./shoes-list.component.css']
})
export class ShoesListComponent implements OnInit {

	shoes: ShoeModel[];
	type: any;
  sortBy: string = '';
  isLoading = false;

  constructor(private shopService: ShopService, private route: ActivatedRoute, private router: Router, private dataService: DataStorageService) { }

   ngOnInit() {
    this.route.data.subscribe(data=>{
      this.type = data['type'];
    });
    this.isLoading = true;
    // this.shoes = this.shopService.getShoes();
    this.dataService.fetchPosts().subscribe(shoes=>{
      this.isLoading = false;
      this.shoes = shoes;      
    });  	
  }

  onClickProduct(id: number){
    this.router.navigate([id], {relativeTo: this.route});
  }

  sortClick(sortType: string){
    if(sortType == ''){
      this.sortBy = 'empty';
    }
    if(sortType == 'newest'){
      this.sortBy = 'newest';
    }
    if(sortType == 'prizeLtoH'){
      this.sortBy = 'prizeLtoH';
    }
    if(sortType == 'prizeHtoL'){
      this.sortBy = 'prizeHtoL';
    }
    if(sortType == 'nameAtoZ'){
      this.sortBy = 'nameAtoZ';
    }
    if(sortType == 'nameZtoA'){
      this.sortBy = 'nameZtoA';
    }
  }

}

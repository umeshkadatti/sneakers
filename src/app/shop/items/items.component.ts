import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ShopService } from '../shop.service';
import { ShoeModel } from '../../shared/shoe.model';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

	items: ShoeModel[] = [];
  isLoading = false;
  length: number;
  error = null;

  constructor(private shopService: ShopService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private dataService: DataStorageService) { }

  ngOnInit() {
  	// this.items = this.shopService.getShoes();
   //  this.shopService.shoeChanged.subscribe((shoes: ShoeModel[])=>{
   //    this.items = shoes;
   //  });
      this.isLoading = true;
      this.dataService.fetchPosts().subscribe(shoes=>{
        this.isLoading = false;
        this.items = shoes;
      }, error =>{
        this.isLoading = false;
        this.error = error.error.error;
      });
    // this.http.put('https://sneakers-2ec6b.firebaseio.com/shoes.json', this.items).subscribe(shoes=>{
    //   console.log(shoes);  
    // });
  }

  addNew(){
  	this.router.navigate(['new'], {relativeTo: this.route});
  }

  isOkay(){
    this.error = null;
  }

  onFetchPosts(){
    this.isLoading = true;
    this.dataService.fetchPosts().subscribe(shoes=>{
      this.isLoading = false;
      this.items = shoes;
    }, error=>{
      this.isLoading = false;
      this.error = error.error.error;
      console.log(this.error);
    });
  }

  onSaveData(){
    this.dataService.createAndStore();
  }

}

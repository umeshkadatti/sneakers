import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { ShoeModel } from './shoe.model';
import { ShopService } from '../shop/shop.service';

@Injectable({providedIn: 'root'})

export class DataStorageService{

	constructor(private http: HttpClient, private shopService: ShopService){}

	createAndStore(){
		let shoes = this.shopService.getShoes();
		this.http.put('https://sneakers-2ec6b.firebaseio.com/shoes.json', shoes).subscribe(shoes=>{
			console.log(shoes);
		});
	}

	fetchPosts(){
		return this.http.get<ShoeModel[]>('https://sneakers-2ec6b.firebaseio.com/shoes.json').pipe(tap(shoes=>{
				this.shopService.fetchShoes(shoes);
		}));
	}
}
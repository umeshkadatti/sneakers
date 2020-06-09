import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { ShopService } from '../shop.service';
import { ShoeModel } from '../../shared/shoe.model';
import { DataStorageService } from '../../shared/data-storage.service';

@Injectable({
	providedIn: 'root'
})

export class ItemResolveService implements Resolve<ShoeModel[]>{

	constructor(private shopService: ShopService, private dataService: DataStorageService){}
	
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShoeModel[]> | Promise<ShoeModel[]> | ShoeModel[]{
		let items = this.shopService.getShoes();
		if(items.length == 0){
			return this.dataService.fetchPosts(); // no need to subscribe fetchPosts here. Resolve will automatilly subscribe for this.
		} else {
			return items;
		}
	}

}
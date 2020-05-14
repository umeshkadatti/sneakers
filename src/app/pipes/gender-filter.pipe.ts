import { Pipe, PipeTransform } from '@angular/core';

import { ShopService } from '../shop/shop.service';


@Pipe({
	name: 'filter'
})

export class GenderFilterPipe implements PipeTransform{

	constructor(private shopService: ShopService){}

	transform(value: any, filterType: string, propName: string, sortBy: string){
		let resultArray = [];
		for(let item of value){
			if(item[propName] == filterType){
				resultArray.push(item);
			}
		}
		this.shopService.getNextShoe(resultArray);

		//No sort

		if(sortBy == 'empty'){
			return resultArray;
		}

		// Sort prize Low to Heigh

		if(sortBy == 'prizeLtoH'){
			resultArray.sort(function(a, b){
				return a.prize - b.prize;
			});
		}

		// sort Prize Heigh to Low

		if(sortBy == 'prizeHtoL'){
			resultArray.sort(function(a, b){
				return b.prize - a.prize;
			})
		}

		// sort by product name A to Z

		if(sortBy == 'nameAtoZ'){
			resultArray.sort(function(a, b){
	   			var nameA=a.itemName.toLowerCase(), nameB=b.itemName.toLowerCase()
			    if (nameA < nameB)
			        return -1 
			    if (nameA > nameB)
			        return 1
			    return 0
			})	
		}

		// sort by product name Z to A

		if(sortBy == 'nameZtoA'){
			resultArray.sort(function(a, b){
	   			var nameA=a.itemName.toLowerCase(), nameB=b.itemName.toLowerCase()
			    if (nameA > nameB)
			        return -1 
			    if (nameA < nameB)
			        return 1
			    return 0
			})	
		}
		return resultArray;
	}
}
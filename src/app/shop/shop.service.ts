import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { ShoeModel } from '../shared/shoe.model';

@Injectable({
	providedIn: 'root'
})

export class ShopService{

	shoeChanged = new Subject<ShoeModel[]>();
	resultArray = new Subject<ShoeModel[]>();
	sortedArrays: ShoeModel[] ;

	shoes: ShoeModel[] = [
	// {prodId: 111, group: 'men', itemName: 'Product 1', imagePath: '../assets/1_men.jpg', hoverImagePath: '../assets/1_men_hover.jpg', prize: 229, color: 'brown', size: 7, sale: 'yes'},
	// {prodId: 444, group: 'women', itemName: 'GProduct 4', imagePath: '../assets/1_women.jpg', hoverImagePath: '../assets/1_women_hover.jpg', prize: 270, color: 'geen', size: 6, sale: 'no'},
	// {prodId: 222, group: 'men', itemName: 'Product 2', imagePath: '../assets/2_men.jpg', hoverImagePath: '../assets/2_men_hover.jpg', prize: 343, color: 'yellow', size: 8, sale: 'no'},
	// {prodId: 555, group: 'women', itemName: 'AProduct 5', imagePath: '../assets/2_women.jpg', hoverImagePath: '../assets/2_women_hover.jpg', prize: 340, color: 'green', size: 6, sale: 'yes'},
	// {prodId: 666, group: 'women', itemName: 'Product 6', imagePath: '../assets/3_women.jpg', hoverImagePath: '../assets/3_women_hover.jpg', prize: 240, color: 'blue', size: 7, sale: 'yes'},
	// {prodId: 333, group: 'men', itemName: 'Product 3', imagePath: '../assets/3_men.jpg', hoverImagePath: '../assets/3_men_hover.jpg', prize: 274, color: 'blue', size: 7, sale: 'no'}
	];

	fetchShoes(shoes: ShoeModel[]){
		this.shoes = shoes;
		this.shoeChanged.next(this.shoes.slice());
	}
	
	getShoes(){
		return this.shoes.slice();
	}

	getShoe(id: number){
		let shoe = this.shoes.find((s)=>{
			return s.prodId == id;
		});
		return shoe;
	}

	getShoeByIndex(index: number){
		return this.shoes[index];
	}

	updateShoes(id: number, shoe: ShoeModel){
		this.shoes[id] = shoe;
		this.shoeChanged.next(this.shoes.slice());
	}

	addShoe(shoe){
		this.shoes.push(shoe);
		this.shoeChanged.next(this.shoes.slice());
	}

	deleteShoe(id){
		this.shoes.splice(id, 1);
		this.shoeChanged.next(this.shoes.slice());
	}

	sortArrays(){
		this.resultArray.subscribe((array: ShoeModel[])=>{
			this.sortedArrays = array;
			console.log(this.sortedArrays);
		});
	}

	getNextShoe(id: number){
		let shoe = this.sortedArrays.find((s)=>{
			return s.prodId == id;
			console.log(shoe);
		});
		return shoe;
	}

	nextShoe(){
		
	}

	getPreviousShoe(cat: string){
		let shoe = this.shoes.find((s)=>{
			return s.group = cat;
		});
		return shoe;
	}

}
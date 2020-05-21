import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ShopService } from '../shop.service';
import { ShoeModel } from '../../shared/shoe.model';

@Component({
  selector: 'app-shoes-edit',
  templateUrl: './shoes-edit.component.html',
  styleUrls: ['./shoes-edit.component.css']
})
export class ShoesEditComponent implements OnInit {

	shoe: ShoeModel;
	editMode = false;
	id: number;
  genders = ['men', 'women'];
  shoeForm: FormGroup;
  update = false;

  constructor(private shopService: ShopService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  	this.route.params.subscribe((params: Params)=>{
  		this.id = +params['id'];
  		this.shoe = this.shopService.getShoeByIndex(this.id);
  		this.editMode = params['id'] != null;
		this.initForm();
  	})
  }

  onSubmit(){
  	let shoe = this.shoeForm.value;
  }

// constructor(public prodId: number, public group: string, public itemName: string, public prize: number, public imagePath: string, public hoverImagePath: string, public color: string, public size: number, public sale: string){}

  onAdd(){
    let itemId = this.shoeForm.get('id').value;
    let itemName = this.shoeForm.get('name').value;
    let group = this.shoeForm.get('group').value;
    let color = this.shoeForm.get('color').value;
    let size = this.shoeForm.get('size').value;
    let price = this.shoeForm.get('price').value;
    let imageUrl = this.shoeForm.get('imageUrl').value;
    let imageHoverUrl = this.shoeForm.get('imageHoverUrl').value;
    let sale = this.shoeForm.get('sale').value;
    let newShoe = new ShoeModel(itemId, group, itemName, price, imageUrl, imageHoverUrl, color, size, sale);
    if(!this.editMode){
      this.shopService.addShoe(newShoe);
    } else {
      this.shopService.updateShoes(this.id, newShoe);
    }
    this.onCancel();
  }

  onClear(){
    this.shoeForm.reset();
  }

  onCancel(){
    this.router.navigate(['shop/items']);
  }

  onDelete(){
    this.shopService.deleteShoe(this.id);
  }

  private initForm(){
  	let itemId = null;
  	let itemName = '';
    let group = null;
    let color = '';
    let size = null;
    let price = null;
    let imageUrl = '';
    let imageHoverUrl = '';
    let sale = 'no';
  	if(this.editMode){
      this.update = true;
  		let shoe = this.shopService.getShoeByIndex(this.id);
  		itemId = shoe.prodId;
  		itemName = shoe.itemName;
      group = shoe.group;
      color = shoe.color;
      size = shoe.size;
      price = shoe.prize;
      imageUrl = shoe.imagePath;
      imageHoverUrl = shoe.hoverImagePath;
      sale = shoe.sale;
  	}
  	this.shoeForm = new FormGroup({
      'id': new FormControl(itemId),
      'name': new FormControl(itemName),
      'group': new FormControl(group),
      'color': new FormControl(color),
      'size': new FormControl(size),
      'price': new FormControl(price),
      'imageUrl': new FormControl(imageUrl),
      'imageHoverUrl': new FormControl(imageHoverUrl),
      'sale': new FormControl(sale)
  	}); 
  }

}

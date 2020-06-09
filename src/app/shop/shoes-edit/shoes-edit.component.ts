import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ShopService } from '../shop.service';
import { ShoeModel } from '../../shared/shoe.model';
import { DataStorageService } from '../../shared/data-storage.service';

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

  constructor(private shopService: ShopService, private route: ActivatedRoute, private router: Router, private http: HttpClient, private dataService: DataStorageService) { }

  ngOnInit() {
  	this.route.params.subscribe((params: Params)=>{
  		this.id = +params['id'];
  		this.shoe = this.shopService.getShoeByIndex(this.id);
  		this.editMode = params['id'] != null;
		this.initForm();
    // this.shoeForm.get('name').valueChanges.subscribe(value=>{
    //   console.log(value);
    // });
    // this.shoeForm.get('name').statusChanges.subscribe(status=>{
    //   console.log(status);
    // });
  	});
  }

  onSubmit(){
    let shoe = this.shoeForm.value;
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
    this.onCancel();
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
      this.editMode = true;
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
      'id': new FormControl(itemId, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'name': new FormControl(itemName, [Validators.required, Validators.pattern(/[a-z]{1,4}/)]),
      'group': new FormControl(group, Validators.required),
      'color': new FormControl(color, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      'size': new FormControl(size, [Validators.required, Validators.pattern('[1-9]+[0-9]*')]),
      'price': new FormControl(price, [Validators.required, Validators.pattern('[1-9]+[0-9]*')]),
      'imageUrl': new FormControl(imageUrl, Validators.required),
      'imageHoverUrl': new FormControl(imageHoverUrl, Validators.required),
      'sale': new FormControl(sale, Validators.required)
  	}); 
  }

}

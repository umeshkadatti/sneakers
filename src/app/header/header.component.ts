import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ShopService } from '../shop/shop.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private shopServie: ShopService, private authService: AuthService) { }

  isLogIn = true;

  ngOnInit() {
  }

  onLogIn(){
  	this.isLogIn = !this.isLogIn;
  	if(this.isLogIn){
  		this.authService.logOut();
      this.router.navigate(['/']);
  	} else{
  		this.authService.logIn();
  	}
  	
  }

  onChoose(type: string){
  	this.router.navigate(['shop', type], { relativeTo: this.route});
  }

  onClick(){
  	this.router.navigate(['shop/cart']);
  }

}

import { Component, OnInit } from '@angular/core';

import { DataStorageService } from './../shared/data-storage.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private dataService: DataStorageService) { }

  ngOnInit() {
  }

}

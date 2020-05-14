import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() price ;
  total: number;

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges){
  	//this.total = this.price.price * this.price.qty;
  }

}

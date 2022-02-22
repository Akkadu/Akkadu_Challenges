import { Component, OnInit } from '@angular/core';
import { reviews } from '../review';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  review : reviews =  {
    id : 1,
    name : 'Mike the reviewer',
    rating : 5,
    review : 'Very good yet not so good',
    timestamp : new Date().getTime(),
    imageUrl: 'https://via.placeholder.com/50',
    productName : 'Unga wa jogoo',
    noofReview : 0
  }

  constructor() { }

  ngOnInit(): void {
  }

}

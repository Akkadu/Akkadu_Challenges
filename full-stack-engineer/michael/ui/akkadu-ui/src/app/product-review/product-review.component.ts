import { Component, OnInit } from '@angular/core';
import { reviews } from '../review';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {

  review : reviews =  {
    id : 1,
    name : 'Mike the reviewer',
    rating : 5,
    review : 'Very good yet not so good hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
    timestamp : new Date().getTime(),
    imageUrl: 'https://via.placeholder.com/50',
    productName : 'Unga wa jogoo',
    noofReview : 0
  }
  
  constructor() { }

  ngOnInit(): void {
    //Put initialization logic here
  }

}

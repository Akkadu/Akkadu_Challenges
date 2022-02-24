import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductReviewComponent } from './product-review/product-review.component'
import { ProductsComponent } from './products/products.component'

const routes: Routes = [
  { path : 'product-review/:id',component:ProductReviewComponent },
  { path : 'products',component:ProductsComponent},
  { path : '',redirectTo:'/products',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

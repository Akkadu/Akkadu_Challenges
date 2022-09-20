import {IReview} from "~/types/review.types";

export interface IProduct {
  id?: number
  name: string
  price: number
  vendor: string
  averageStars?: number
  reviewsCount?: number
  reviews?: IReview[]
}

export interface IProductsResponse {
  success: boolean;
  message: string;
  products: IProduct[]
}

export interface IProductResponse {
  success: boolean;
  message: string;
  product: IProduct
}

export interface ICreateReviewResponse {
  success: boolean;
  message:string;
  review: IReview;
}

export interface ICreateReviewInput{
  reviewId?: number;
  productId: number;
  stars: number;
  comment: string
}

type Field = 'comment|stars'

export interface IBackendError {
  msg: string,
  param: Field,
}


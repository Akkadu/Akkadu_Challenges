import {IProductsResponse} from "~/services";
import {ICreateReviewInput, ICreateReviewResponse, IProductResponse} from "~/services/types";
declare module 'vue/types/vue' {
  interface Vue {
    $productService: {
      GetProducts: () => Promise<IProductsResponse>,
      CreateReview: (review: ICreateReviewInput, token: string) => Promise<ICreateReviewResponse>,
      GetProductReviews: (id: number) => Promise<IProductResponse>,
      EditReview: (review: ICreateReviewInput, token: string) => Promise<ICreateReviewResponse>,
      DeleteReview: (id: number, token: string) => Promise<void>
    }

    // nuxt runtime
    $config: any
  }
}

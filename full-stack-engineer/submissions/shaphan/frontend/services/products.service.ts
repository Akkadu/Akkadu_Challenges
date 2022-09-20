import { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import {ICreateReviewInput, ICreateReviewResponse, IProductResponse, IProductsResponse} from "~/services/types";


export default ($axios: AxiosInstance) => ({
  GetProducts(): Promise<IProductsResponse> {
    return $axios.get(`/products`).then((res: AxiosResponse<IProductsResponse>) =>{
      const { data } = res
      return data
    }).catch((error: AxiosError) => {
      throw error
    })
  },
  CreateReview(review: ICreateReviewInput, token: string): Promise<ICreateReviewResponse> {
    return $axios.post(
        '/reviews',
        {
          ...review,
        },
        {
          headers: {
            authorization: token,
          },
        }
      ).then((res: AxiosResponse<ICreateReviewResponse>) => {
        return res?.data
    }).catch((error: AxiosError) => {
      throw error
    })
  },
  GetProductReviews(id: number) {
    return $axios.get(`/products/${id}/reviews`).then((res: AxiosResponse<IProductResponse>) =>{
      const { data } = res
      return data
    }).catch((error: AxiosError) => {
      throw error
    })
  },
  EditReview(review: ICreateReviewInput, token: string): Promise<ICreateReviewResponse> {
    return $axios.put(
      `/reviews/${review.reviewId}`,
      {
        ...review,
      },
      {
        headers: {
          authorization: token,
        },
      }
    ).then((res: AxiosResponse<ICreateReviewResponse>) => {
      return res?.data
    }).catch((error: AxiosError) => {
      throw error
    })
  },
  DeleteReview(id: number, token: string) {
    return $axios.delete(`/reviews/${id}`, {
      headers: {
        authorization: token,
      },
    }).then((res: AxiosResponse<IProductResponse>) =>{
      const { data } = res
      return data
    }).catch((error: AxiosError) => {
      throw error
    })
  }
})

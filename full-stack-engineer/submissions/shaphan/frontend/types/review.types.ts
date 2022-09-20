export interface IReview {
  id: number
  stars: number
  comment: string
  User?: {
    id: number
    fullName: string
  }
}

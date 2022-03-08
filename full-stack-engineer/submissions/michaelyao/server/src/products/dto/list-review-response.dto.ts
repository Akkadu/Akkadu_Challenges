import { Expose, Transform } from 'class-transformer';

export class ListReviewsResponseDto {
  @Expose()
  id: number;

  @Expose()
  rating: number;

  @Expose()
  text: string;

  @Expose()
  @Transform(({ obj }) => {
    const { id, username } = obj.user;
    return {
      id,
      username,
    };
  })
  user: {
    id: number;
    username: string;
  };

  @Expose()
  @Transform(({ obj }) => obj.product.id)
  product_id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

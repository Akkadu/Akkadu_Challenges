import { Expose } from 'class-transformer';

export class ReviewDto {
  @Expose()
  id: number;

  @Expose()
  rating: number;

  @Expose()
  text: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;

  @IsString()
  text: string;
}

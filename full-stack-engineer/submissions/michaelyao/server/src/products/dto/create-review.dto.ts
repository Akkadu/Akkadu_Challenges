import { IsString, IsNumber, Min, Max, Length } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @Length(1, 500)
  text: string;
}

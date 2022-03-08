import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AdminGuard } from '../guards/admin.guards';
import { CurrentUser } from '../users/current-user.decorator';
import { AuthGuard } from '../guards/auth.guards';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../users/entities/user.entity';
import { Serialize } from '../interceptors/serialize.interceptors';
import { ReviewDto } from './dto/review.dto';
import { ListReviewsResponseDto } from './dto/list-review-response.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post('/:id/reviews')
  @UseGuards(AuthGuard)
  @Serialize(ReviewDto)
  createReview(
    @Param('id') id: string,
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() user: User,
  ) {
    return this.reviewsService.create(createReviewDto, user, parseInt(id));
  }

  @Get('/:id/reviews')
  @Serialize(ListReviewsResponseDto)
  listReviews(@Param('id') id: string) {
    return this.reviewsService.findAll(parseInt(id));
  }
}

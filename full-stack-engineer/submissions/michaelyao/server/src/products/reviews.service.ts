import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Repository } from 'typeorm/repository/Repository';
import { Product } from '../products/entities/product.entity';
import { Review } from './entities/review.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    user: User,
    product_id: number,
  ) {
    const review = this.reviewRepo.create(createReviewDto);
    const product = await this.productRepo.findOne(product_id);
    review.product = product;
    review.user = user;
    return this.reviewRepo.save(review);
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    user: User,
    product_id: number,
    createReviewDto: CreateReviewDto,
  ) {
    const review = this.reviewRepo.create(createReviewDto);
    const product = await this.productRepo.findOne(product_id);
    review.product = product;
    review.user = user;
    return this.reviewRepo.save(review);
  }

  async findAll(product_id: number) {
    const reviews = await this.reviewRepo.find({
      where: {
        product: {
          id: product_id,
        },
      },
      relations: ['user', 'product'],
    });
    return reviews;
  }

  async update(
    user: User,
    review_id: number,
    updateReviewDto: UpdateReviewDto,
  ) {
    const [review] = await this.reviewRepo.find({
      where: {
        id: review_id,
      },
      relations: ['user', 'product'],
    });
    if (!review) {
      throw new NotFoundException('review not found');
    }
    if (user.id != review.user.id) {
      throw new ForbiddenException('you can only edit your review');
    }
    Object.assign(review, updateReviewDto);
    return this.reviewRepo.save(review);
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}

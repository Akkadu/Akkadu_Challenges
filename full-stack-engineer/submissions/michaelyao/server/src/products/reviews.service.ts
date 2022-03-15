import {
  BadRequestException,
  ConflictException,
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
    const [product] = await this.productRepo.find({
      where: {
        id: product_id,
      },
      relations: ['reviews'],
    });
    if (!product) {
      throw new NotFoundException('product not found');
    }
    const reviewUserIds = product.reviews.map((review) => review.user.id);
    if (reviewUserIds.includes(user.id)) {
      throw new ConflictException(
        'you have already created an review for the product',
      );
    }

    const review = this.reviewRepo.create(createReviewDto);
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
      relations: ['product'],
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
      relations: ['product'],
    });
    if (!review) {
      throw new NotFoundException('review not found');
    }
    if (user.id != review.user.id) {
      throw new BadRequestException('you can only edit your reviews');
    }
    Object.assign(review, updateReviewDto);
    return this.reviewRepo.save(review);
  }

  async remove(user: User, review_id: number) {
    const [review] = await this.reviewRepo.find({
      where: {
        id: review_id,
      },
      relations: ['product'],
    });
    if (!review) {
      throw new NotFoundException('review not found');
    }
    if (user.id != review.user.id) {
      throw new BadRequestException('you can only delete your reviews');
    }
    return this.reviewRepo.remove(review);
  }
}

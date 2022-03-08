import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from '../../products/entities/review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(username: string, password: string) {
    const user = this.repo.create({ username, password });
    return this.repo.save(user);
  }

  find(username: string) {
    return this.repo.find({ username });
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}

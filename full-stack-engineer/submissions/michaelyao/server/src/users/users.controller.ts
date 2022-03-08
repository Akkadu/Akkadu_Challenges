import {
  Controller,
  Get,
  Post,
  Body,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from './dto/user.dto';
import { CurrentUser } from './current-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '../guards/auth.guards';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.username, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.username, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/currentUser')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }
}

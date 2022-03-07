import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should create a user with given username and password', async () => {
    const username = 'test_username';
    const password = 'test_password';
    jest.spyOn(userRepository, 'create').mockReturnValueOnce({
      id: 1,
      username: username,
      password: password,
      reviews: null,
    });
    jest.spyOn(userRepository, 'save').mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        username,
        password,
        reviews: null,
      }),
    );
    const user = await service.create(username, password);
    expect(user.username).toEqual(username);
    expect(user.password).toEqual(password);
  });

  it('should be able to find a user by username', async () => {
    const username = 'test_username';
    const password = 'test_password';
    jest.spyOn(userRepository, 'find').mockImplementationOnce(() =>
      Promise.resolve([
        {
          id: 1,
          username,
          password,
          reviews: null,
        },
      ]),
    );
    const user = await service.find(username);
    expect(user[0].username).toEqual(username);
  });
});

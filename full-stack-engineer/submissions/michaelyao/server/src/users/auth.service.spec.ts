import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const username = 'test_username';
    const password = 'test_password';
    jest
      .spyOn(usersService, 'find')
      .mockImplementationOnce(() => Promise.resolve([]));
    jest.spyOn(usersService, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        username: username,
        password: `salt.hash`,
        reviews: null,
      }),
    );
    const user = await service.signup(username, password);

    expect(user.password).not.toEqual(password);
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with username that is in use', async () => {
    const username = 'test_username';
    const password = 'test_password';
    jest.spyOn(usersService, 'find').mockImplementationOnce(() =>
      Promise.resolve([
        {
          id: 1,
          username: username,
          password: `salt.hash`,
          reviews: null,
        },
      ]),
    );

    try {
      await service.signup(username, password);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      let error = err as BadRequestException;
      expect(error.message).toEqual(
        'This username is in use already. Please use another one',
      );
    }
  });

  it('throws not found error when signin is called with an unexisting username', async () => {
    const username = 'test_username';
    const password = 'test_password';
    jest
      .spyOn(usersService, 'find')
      .mockImplementationOnce(() => Promise.resolve([]));

    try {
      await service.signin(username, password);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
      let error = err as NotFoundException;
      expect(error.message).toEqual('user not found');
    }
  });

  it('throws a bad request error if an invalid password is provided', async () => {
    const username = 'test_username';
    const password = 'test_password';
    jest.spyOn(usersService, 'find').mockImplementationOnce(() =>
      Promise.resolve([
        {
          id: 1,
          username: username,
          password: `salt.hash`,
          reviews: null,
        },
      ]),
    );

    try {
      await service.signin(username, password);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      let error = err as BadRequestException;
      expect(error.message).toEqual('wrong password');
    }
  });

  it('returns a user if correct password is provided', async () => {
    const username = 'test_username';
    const password = 'test_password';
    jest.spyOn(usersService, 'find').mockImplementationOnce(() =>
      Promise.resolve([
        {
          id: 1,
          username: username,
          password: `salt.a0b14d7bc3d839b2a4e2da253844812a862a8b210c8a8726a4138774f1ca58c4`,
          reviews: null,
        },
      ]),
    );

    const user = await service.signin(username, password);
    expect(user).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: User = {
    id: '123e4567-e89b-12d3-a456-426614174000' as any,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    age: 25,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      age: 25,
      isActive: true,
    };

    mockUsersService.create.mockResolvedValue(mockUser);

    const result = await controller.create(createUserDto);

    expect(service.create).toHaveBeenCalledWith(createUserDto);
    expect(result).toEqual({
      success: true,
      data: mockUser,
    });
  });

  it('should return all users', async () => {
    mockUsersService.findAll.mockResolvedValue([mockUser]);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual({
      success: true,
      data: [mockUser],
    });
  });
});

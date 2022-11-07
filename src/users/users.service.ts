import { Injectable } from '@nestjs/common';
import { AppRoles } from 'src/auth/auth.roles';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Mustafa',
      password: 'darsh',
      roles:[AppRoles.CUD_PRODUCTS]
    },
    {
      userId: 2,
      username: 'Ali',
      password: 'march',
      roles:[AppRoles.CUD_CATEGORY],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
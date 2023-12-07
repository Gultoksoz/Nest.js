import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Get()
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':userId')
  findUserById(@Param('userId') userId: string): Promise<User | null> {
    return this.usersService.findUserById(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}

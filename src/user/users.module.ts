import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './model/user.schema';
import { RequestCountMiddleware } from '../request-count.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
// export class UsersModule {}
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestCountMiddleware).forRoutes('users/*');
  }
}

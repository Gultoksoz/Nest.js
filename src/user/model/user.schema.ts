import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
@ApiTags('users')
export class User extends Document {
  @Prop()
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

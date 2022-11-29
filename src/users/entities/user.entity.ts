import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { ValidRoles } from 'src/auth/interfaces';

@Schema()
export class User extends Document {
  @ApiProperty({
    description: 'Email address',
    example: 'email@google.com',
    uniqueItems: true,
  })
  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @ApiProperty()
  @Prop({
    type: String,
    select: false,
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'Full Name',
    example: 'John Doe',
  })
  @Prop({
    type: String,
    required: true,
  })
  fullName: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Roles',
    example: ['user'],
  })
  @Prop({
    type: [String],
    default: [ValidRoles.user],
  })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

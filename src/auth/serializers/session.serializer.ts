import { InjectModel } from '@nestjs/mongoose';
import { PassportSerializer } from '@nestjs/passport';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super();
  }
  serializeUser(user: User, done: (error: boolean, user: User) => void) {
    done(null, user);
  }
  async deserializeUser(
    payload: User,
    done: (error: boolean, user: User | null) => void,
  ) {
    const user = await this.userModel.findById(payload._id);
    return user ? done(null, user) : done(null, null);
  }
}

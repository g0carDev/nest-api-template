import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, RegisterUserDto } from './dto';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { fullName, email, password } = registerUserDto;
    const newUser = {
      fullName: fullName.trim(),
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
    };
    try {
      const dbUser = await this.userModel.create(newUser);
      const { _id, fullName, roles } = dbUser;
      return {
        _id,
        fullName,
        email,
        roles,
        token: this.getJwtToken({ _id }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userModel
      .findOne({ email: email.toLowerCase() })
      .select('+password');
    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');
    try {
      const { _id, fullName, roles, email } = user;
      return {
        _id,
        fullName,
        email,
        roles,
        token: this.getJwtToken({ _id: user._id }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  googleLogin(user: User) {
    if (!user) throw new UnauthorizedException('Unauthorized');
    const { _id, fullName, email, roles } = user;
    return {
      _id,
      fullName,
      email,
      roles,
      token: this.getJwtToken({ _id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === 11000)
      throw new BadRequestException(
        `User exists in db ${JSON.stringify(error.keyValue)}`,
      );
    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}

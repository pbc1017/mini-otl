import {
  Body,
  Request,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JWTUser } from 'src/auth/decorator/jwt.decorator';
import { UserProfileDTO } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<void> {
    await this.usersService.createUser(signupDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@JWTUser() jwt): Promise<UserProfileDTO> {
    const result = await this.usersService.getUserProfile(jwt.id);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('reviews')
  async getUserReviews(@JWTUser() user) {
    return this.usersService.getUserReviews(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('reviews/likes')
  async getUserLikedReviews(@JWTUser() user) {
    return this.usersService.getUserLikedReviews(user.id);
  }

  // @UseGuards(JwtAuthGuard) // JWT 인증 가드를 사용하여 보호
  // @Get(':email')
  // findOne(@Param('email') email: string) {
  //   return this.usersService.findOne(email);
  // }
}

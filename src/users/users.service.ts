import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // email을 기반으로 사용자를 찾는 메소드
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(signupDto: SignupDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    await this.prisma.user.create({
      data: {
        email: signupDto.email,
        password: hashedPassword,
        lastName: signupDto.lastName,
        firstName: signupDto.firstName,
        departmentId: signupDto.departmentId,
      },
    });
  }
}

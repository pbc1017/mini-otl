import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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

  async getUserProfile(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        department: {
          select: {
            id: true,
            nameKr: true,
            nameEn: true,
            code: true,
          },
        },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getUserReviews(userId: number) {
    return this.prisma.review.findMany({
      where: {
        userId: userId,
      },
      include: {
        lecture: true,
      },
    });
  }

  async getUserLikedReviews(userId: number) {
    return this.prisma.review.findMany({
      where: {
        likedBy: {
          some: {
            id: userId,
          },
        },
      },
    });
  }
}

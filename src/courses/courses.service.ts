import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany();
  }

  async findOne(courseId: number) {
    return this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        department: true, // Assuming you want to include department info
        lectures: true, // Assuming you want to include lectures info
      },
    });
  }
}

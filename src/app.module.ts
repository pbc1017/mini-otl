import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DepartmentsModule } from './departments/departments.module';
import { ProfessorsModule } from './professors/professors.module';
import { CoursesModule } from './courses/courses.module';
import { LecturesModule } from './lectures/lectures.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TimetablesModule } from './timetables/timetables.module';
import { SemestersModule } from './semesters/semesters.module';

@Module({
  imports: [UsersModule, DepartmentsModule, ProfessorsModule, CoursesModule, LecturesModule, ReviewsModule, TimetablesModule, SemestersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

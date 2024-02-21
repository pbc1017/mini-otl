import { Module } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';

@Module({
  providers: [ProfessorsService],
  controllers: [ProfessorsController]
})
export class ProfessorsModule {}

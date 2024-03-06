import { DepartmentDTO } from 'src/departments/dto/departments.dto';

export type UserProfileDTO = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  department: DepartmentDTO;
  // isAdmin: boolean;
};

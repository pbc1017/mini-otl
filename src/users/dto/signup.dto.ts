export class SignupDto {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  departmentId: number; // Assuming each user is associated with a department
}

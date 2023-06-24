
import { Student } from "src/app/IdentityAndAccessManagament/models/student";

export class ResultModel {
  id?: string;
  createdAt: Date;
  score: number;
  status: String;
  student: Student;

}

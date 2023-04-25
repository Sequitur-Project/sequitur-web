import { ResultModel } from "src/app/DiagnosticTreatment/models/ResultModel";
import { University } from "./university";

export class Student {
  id?: String;
  email: string;
  firstName: String;
  lastName: String;
  password: String;
  telephone: String;
  birthDate: Date;
  university: University;
  results: ResultModel[];
}


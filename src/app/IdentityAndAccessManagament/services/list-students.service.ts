import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Student } from "../models/student";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ListStudentsService {

  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) { }

  getListStudents(): Observable<Student[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => {
        return res.content.map((student: { firstName: any; lastName: any; email: any; results: {
          score: any;
          status: any;
          createdAt: any;
        }[]; }) => ({
          name: `${student.firstName} ${student.lastName}`,
          email: student.email,
          status: student.results.length > 0 ? student.results[0].status : 'No hay resultado aun',
          result: student.results.length > 0 ? student.results[0].score : 'No hay resultado aun',
          date: student.results.length > 0 ? student.results[0].createdAt : 'No hay fecha de resultado aun'
        } as unknown as Student));
      })
    );
  }

}

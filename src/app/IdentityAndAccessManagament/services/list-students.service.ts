import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Student } from "../models/student";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ListStudentsService {

  private apiUrl = 'https://back-sequitur-production.up.railway.app/api/students';
  private universityUrl = 'https://back-sequitur-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  getListStudents(): Observable<Student[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => {
        return res.content.map((student: { id: any; firstName: any; lastName: any; email: any; results: {
          score: any;
          status: any;
          createdAt: any;
        }[]; }) => ({
          id: student.id,
          name: `${student.firstName} ${student.lastName}`,
          email: student.email,
          status: student.results.length > 0 ? student.results[0].status : 'No hay resultado aun',
          result: student.results.length > 0 ? student.results[0].score : 'No hay resultado aun',
          date: student.results.length > 0 ? student.results[0].createdAt : 'No hay fecha de resultado aun'
        } as unknown as Student));
      })
    );
  }

  getStudentById(studentId: string): Observable<Student> {
    console.log("Fetching student with ID: ", studentId);
    return this.http.get<any>(`${this.apiUrl}/${studentId}`).pipe(
      map(res => ({
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        genre: res.genre,
        telephone: res.telephone,
        birthDate: new Date(res.birthDate),
        results: res.results.map((result: { status: any; score: any; createdAt: any; }) => ({
          status: result.status,
          score: result.score,
          createdAt: result.createdAt
        }))
      } as unknown as Student))
    );
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getAllStudentsByUniversityId(universityId: string): Observable<Student[]> {
    const url = `${this.universityUrl}/universities/${universityId}/students`;
    return this.http.get<Student[]>(url);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/student';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListStudentsService } from '../services/list-students.service';
import { ManagerService } from 'src/app/user/services/login-manager.service';
import { University } from '../models/university';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit{
  displayedColumns: string[] = ['name', 'email', 'telephone', 'genre','birthDate'];
  dataSource: MatTableDataSource<Student>;
  isfinishedLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  students: Student[];

  constructor(private listStudentsService: ListStudentsService, private managerService: ManagerService) {
   }

  ngOnInit(): void {
    this.getStudents();
    console.log(this.getStudents);

  }
  getStudents(): void {
    const universityId = this.managerService.getLoggedInManager()?.university?.id;
    console.log(universityId);
    if (universityId) {
      this.listStudentsService.getAllStudentsByUniversityId(universityId)
        .subscribe((students: Student[]) => {
          this.students = students;
          this.dataSource = new MatTableDataSource(this.students);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          setTimeout(() => {
            this.isfinishedLoading = true;
          }, 200);
  
        });
    }
  }
}

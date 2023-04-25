import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/IdentityAndAccessManagament/models/student';
import { ListStudentsService } from 'src/app/IdentityAndAccessManagament/services/list-students.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'status', 'result','date'];
  dataSource: MatTableDataSource<Student>;



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private listStudentsService: ListStudentsService) {
   }

  ngOnInit(): void {
    this.listStudentsService.getListStudents().subscribe(
      students => {
        this.dataSource = new MatTableDataSource<Student>(students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)
    );
  }
}


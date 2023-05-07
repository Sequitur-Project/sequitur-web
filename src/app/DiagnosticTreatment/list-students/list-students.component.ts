import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/IdentityAndAccessManagament/models/student';
import { ListStudentsService } from 'src/app/IdentityAndAccessManagament/services/list-students.service';
import { ResultsInfoComponent } from '../results-info/results-info.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecommendationComponent } from '../create-recommendation/create-recommendation.component';
import { AppointmentComponent } from 'src/app/ProactiveCommunication/appointment/appointment.component';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'status', 'result','info','recommendation','appointment','date'];
  dataSource: MatTableDataSource<Student>;



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private listStudentsService: ListStudentsService, public dialog: MatDialog) {
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

  showResultsDialog(studentId: string) {
    console.log(`Showing results dialog for student ID: ${studentId}`);
    this.listStudentsService.getStudentById(studentId).subscribe(
      student => {
        console.log(`Fetched student with ID: ${studentId}`, student);
        const dialogRef = this.dialog.open(ResultsInfoComponent, {
          width: '70%',
          height:'800px',
          data: { student }
        });
      },
      error => console.log(error)
    );
  }

  openRecommendationDialog(studentId: number): void {
    const dialogRef = this.dialog.open(CreateRecommendationComponent, {
      width: '50%',
      height:'500px',
      data: { studentId: studentId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openCreateAppointmentDialog(studentId: number): void {
    const dialogRef = this.dialog.open(AppointmentComponent, {
      width: '50%',
      height: '500px',
      data: { studentId: studentId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // handle the result after the dialog is closed
    });
  }



}


import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/IdentityAndAccessManagament/models/student';
import { ResultModel } from '../models/ResultModel';
import { ViewBinnacleComponent } from 'src/app/DataCollection/view-binnacle/view-binnacle.component';
import { ViewPhqComponent } from 'src/app/DataCollection/view-phq/view-phq.component';

@Component({
  selector: 'app-results-info',
  templateUrl: './results-info.component.html',
  styleUrls: ['./results-info.component.css']
})
export class ResultsInfoComponent  {
  student: Student;

  gaugePath: string = '';
  gaugeFill: string = '';
  isCollapsed: { [key: string]: boolean } = {};
  hasResults: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ResultsInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { student: Student },
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  this.student = this.data.student;
  this.hasResults = this.student.results && this.student.results.length > 0;

  if (this.hasResults) {
    const score = this.student.results[0].score;
    const angle = score * 360 / 27;
    const radius = 80;
    const radians = angle * Math.PI / 180;
    const x = 100 + radius * Math.sin(radians);
    const y = 100 - radius * Math.cos(radians);
    const largeArcFlag = angle <= 180 ? 0 : 1;

    this.gaugePath = `M 100,20 A 80,80 0 ${largeArcFlag},1 ${x},${y} L 100,100 Z`;
    this.gaugeFill = score >= 10 ? '#f44336' : '#00c853';
  } else {
    console.warn('Este estudiante no tiene resultados.');
  }
}

  get results(): ResultModel[] {
    return this.student.results;
  }

  getScoreAngle(score: number) {
    return (100 + 80 * Math.sin(score * Math.PI / 27)) + ' ' + (100 - 80 * Math.cos(score * Math.PI / 27));
  }

  toggleCollapse(type: string): void {
    this.isCollapsed[type] = !this.isCollapsed[type];
  }

  viewBinnacleInfoDialog(): void {
    const dialogRef = this.dialog.open(ViewBinnacleComponent, {
      width: '70wh',
      height: '80vh',
      data: { student: this.student }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  viewPhqInfoDialog(): void {
    const dialogRef = this.dialog.open(ViewPhqComponent, {
      width: '70wh',
      height: '80vh',
      data: { student: this.student }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  }






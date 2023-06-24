import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BinnacleEntry } from '../models/BinnacleEntry';
import { BinnacleService } from '../services/binnacle.service';
import { Student } from 'src/app/IdentityAndAccessManagament/models/student';
import { Binnacle } from '../models/binnacle';

@Component({
  selector: 'app-view-binnacle',
  templateUrl: './view-binnacle.component.html',
  styleUrls: ['./view-binnacle.component.css']
})
export class ViewBinnacleComponent {
  binnacleEntries: BinnacleEntry[] = [];
  binnacle: Binnacle = new Binnacle();
  isfinishedLoading: boolean = false;


  constructor(
    private binnacleService: BinnacleService,
    @Inject(MAT_DIALOG_DATA) public data: { student: Student }
  ) { }

  ngOnInit(): void {
    if (this.data.student && this.data.student.id) {
      const studentId = this.data.student.id;

      this.binnacleService.getBinnacleByStudentId(studentId)
        .subscribe(
          (binnacle: Binnacle) => {
            this.binnacle = binnacle;
            console.log(this.binnacle);
            setTimeout(() => {
              this.isfinishedLoading = true;
            }, 300);
          },
          (error: any) => {
            console.error('Error retrieving binnacle', error);
          }
        );
    } else {
      console.error('Invalid student data');
    }
  }

  getBinnacleEntriesPerDay(): { date: string, entries: BinnacleEntry[] }[] {
    const entriesPerDay: { date: string, entries: BinnacleEntry[] }[] = [];

    if (!this.binnacle || !this.binnacle.binnacleEntries) {
      return entriesPerDay;
    }

    // Group binnacle entries by date
    this.binnacle.binnacleEntries.forEach((entry: BinnacleEntry) => {
      let entryDate: string;
      if (typeof entry.createdAt === 'string') {
        entryDate = new Date(entry.createdAt).toISOString().split('T')[0];
      } else {
        entryDate = entry.createdAt.toISOString().split('T')[0];
      }

      // Check if entriesPerDay already contains entries for the date
      const index = entriesPerDay.findIndex((day) => day.date === entryDate);

      if (index !== -1) {
        // Add the entry to existing entries for the date
        entriesPerDay[index].entries.push(entry);
      } else {
        // Create a new entry group for the date
        entriesPerDay.push({ date: entryDate, entries: [entry] });
      }
    });

    return entriesPerDay;
  }

  getBinnacleEntriesPerWeek(): { date: string, entries: BinnacleEntry[] }[][] {
    const entriesPerDay = this.getBinnacleEntriesPerDay();

    // Group entries by week
    const entriesPerWeek: { date: string, entries: BinnacleEntry[] }[][] = [];

    entriesPerDay.forEach((day) => {
      const entryDate = new Date(day.date);
      const weekNumber = this.getWeekNumber(entryDate);

      if (!entriesPerWeek[weekNumber]) {
        entriesPerWeek[weekNumber] = [];
      }

      entriesPerWeek[weekNumber].push(day);
    });

    return entriesPerWeek;
  }

  getWeekNumber(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(((date.getTime() - onejan.getTime()) / millisecsInDay + onejan.getDay() + 1) / 7);
  }


}

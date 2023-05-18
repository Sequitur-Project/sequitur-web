import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Psychologist } from '../models/psychologist';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ManagerService } from 'src/app/user/services/login-manager.service';
import { ListPsychologistsService } from '../services/list-psychologists.service';

@Component({
  selector: 'app-psychologist-list',
  templateUrl: './psychologist-list.component.html',
  styleUrls: ['./psychologist-list.component.css']
})
export class PsychologistListComponent implements OnInit{
  displayedColumns: string[] = ['name', 'email', 'telephone'];
  dataSource: MatTableDataSource<Psychologist>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  psychologists: Psychologist[];

  constructor(private listPsychologistsService: ListPsychologistsService, private managerService: ManagerService) {
   }

  ngOnInit(): void {
    this.getPsychologists();

  }
  getPsychologists(): void {
    const universityId = this.managerService.getLoggedInManager()?.university?.id;
    console.log(universityId);
    if (universityId) {
      this.listPsychologistsService.getAllPsychologistsByUniversityId(universityId)
        .subscribe((students: Psychologist[]) => {
          this.psychologists = students;
          this.dataSource = new MatTableDataSource(this.psychologists);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    }
  }
}

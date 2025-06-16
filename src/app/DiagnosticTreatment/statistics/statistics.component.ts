import { Component} from '@angular/core';

import { StatisticsService } from '../services/statistics.service';

import { Statistics } from 'src/app/DataCollection/models/statistics-model';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ManagerService } from 'src/app/user/services/login-manager.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [    
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class StatisticsComponent {

  set: Statistics;
  isfinishedLoading: boolean = false;
  universityName: String = '';
  today = new Date();
  sixMonthsAgo = new Date();

  constructor(private statisticsService: StatisticsService, private managerService: ManagerService) {
  }
  ngOnInit(): void {
    this.getDepressionSets();
    this.universityName = this.managerService.getLoggedInManager()?.university.name!;
    this.sixMonthsAgo.setMonth(this.today.getMonth() - 6);
  }
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#449E51', '#275C2F', '#5EDB71', '#64E878', '#53C264'],
  };
  depressionTypesData: any[] = [];
  depressionData: any[] = [];
  studentData: any[] = [];
  psychologistData: any[] = [];
  
  xAxisFormat(val: any){
    if(val%1>0) return "";
    return val;
  }


  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 2, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 4, color: '#DDBDF1'},
  ];

  

  openDatePicker(dp:any) {

    dp.open();
  }

  closeDatePicker(eventData: any, dp?:any) {
    dp.close();    
  }
  

  getDepressionSets() {
    this.depressionTypesData = [];
    this.studentData = [];
    this.psychologistData = [];
    this.depressionData = [];
    const universityId = this.managerService.getLoggedInManager()?.university.id;
    if(universityId){
    this.statisticsService.getUniversityDepressionIndicatorSet(universityId).subscribe(
      response => {
        this.set = response;

        //Para la barra, niveles de depresión
        this.depressionTypesData.push({name:'Leve',value:this.set.depressionLeveQuantity});
        this.depressionTypesData.push({name:'Minima',value:this.set.depressionMinimaQuantity});
        this.depressionTypesData.push({name:'Moderada',value:this.set.depressionModeradaQuantity});
        this.depressionTypesData.push({name:'Moderada Severa',value:this.set.depressionModeradaSeveraQuantity});
        this.depressionTypesData.push({name:'Severa',value:this.set.depressionSeveraQuantity});

        //Para las cards, cantidad de estudiantes y psicologos
        this.studentData.push({ name: 'Estudiantes', value: this.set.studentsQuantity });
        this.psychologistData.push({ name: 'Psicólogos', value: this.set.psychologistsQuantity });

        //Para el piechart, porcentaje de depresión
        this.depressionData.push({name:'Depresión',value:this.set.depressionPercentage});
        this.depressionData.push({name:'No depresión',value:this.set.noDepressionPercentage});

        setTimeout(() => {
          this.isfinishedLoading = true;
        }, 600);

       
      },
      error => console.log(error)
    );
    }
  }

}







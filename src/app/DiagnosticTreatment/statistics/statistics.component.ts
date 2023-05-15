import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UniversityDepressionIndicatorSet } from '../models/UniversityDepressionIndicatorSet';
import { StatisticsService } from '../services/statistics.service';
import { ManagerService } from 'src/app/user/services/login-manager.service';
import Chart from 'chart.js/auto';




@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, AfterViewInit{
  universityDepressionIndicatorSet: UniversityDepressionIndicatorSet | undefined;
  universityDepressionIndicatorSets = {
    depressionLeveQuantity: 10,
    depressionMinimaQuantity: 20,
    depressionModeradaQuantity: 30,
    depressionModeradaSeveraQuantity: 40,
    depressionSeveraQuantity: 50
  };


  constructor(private statisticsService: StatisticsService, private managerService: ManagerService) { }

  ngOnInit(): void {
    this.getUniversityDepressionIndicatorSet();

  }
  ngAfterViewInit(): void {

  }
  getUniversityDepressionIndicatorSet(): void {
    const universityId = this.managerService.getLoggedInManager()?.university?.id;
    if (universityId) {
      this.statisticsService.getUniversityDepressionIndicatorSet(universityId)
        .subscribe(universityDepressionIndicatorSet => {
          this.universityDepressionIndicatorSet = universityDepressionIndicatorSet;
          console.log(this.universityDepressionIndicatorSet);
        });
    }
  }

  createChart(): void {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    console.log(canvas);
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Depression Leve', 'Depression Minima', 'Depression Moderada', 'Depression Moderada Severa', 'Depression Severa'],
          datasets: [{
            label: 'Depression Level Quantity',
            data: [
              this.universityDepressionIndicatorSets.depressionLeveQuantity,
              this.universityDepressionIndicatorSets.depressionMinimaQuantity,
              this.universityDepressionIndicatorSets.depressionModeradaQuantity,
              this.universityDepressionIndicatorSets.depressionModeradaSeveraQuantity,
              this.universityDepressionIndicatorSets.depressionSeveraQuantity,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {

                beginAtZero: true,
                ticks:{
                  callback: function (value: any, index: any, values: any) {
                    return value;
                }
              }
            }
          }
        }
      });
    }

  }

}







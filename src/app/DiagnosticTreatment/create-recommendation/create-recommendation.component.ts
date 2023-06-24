import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RecommendationService } from 'src/app/IdentityAndAccessManagament/services/recommendation.service';
import { PsychologistService } from 'src/app/user/services/login.service';
import { Recommendation } from '../models/recommendation';

@Component({
  selector: 'app-create-recommendation',
  templateUrl: './create-recommendation.component.html',
  styleUrls: ['./create-recommendation.component.css']
})
export class CreateRecommendationComponent implements OnInit{

  studentId: string;
  text: string;

  constructor(
    public dialogRef: MatDialogRef<CreateRecommendationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private psychologistService: PsychologistService,
    private recommendationService: RecommendationService
  ) { }

  ngOnInit(): void {
    this.studentId = this.data.studentId;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const psychologistId = this.psychologistService.getLoggedInPsychologist()?.id;
    console.log(psychologistId);



    const newRecommendation: Recommendation = {
      text: this.text,
      psychologistId: psychologistId!,
      studentId: this.studentId
    };

    this.recommendationService.createRecommendation(psychologistId!, this.studentId, newRecommendation)
      .subscribe(recommendation => {
        console.log('Recommendation created: ', recommendation);
        this.dialogRef.close();
      });
  }
  }



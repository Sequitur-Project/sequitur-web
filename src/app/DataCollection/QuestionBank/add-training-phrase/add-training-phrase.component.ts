import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionBankService } from '../../services/question-bank.service';
import { TrainingPhrase } from '../../models/training-phrase-model';

@Component({
  selector: 'app-add-training-phrase',
  templateUrl: './add-training-phrase.component.html',
  styleUrls: ['./add-training-phrase.component.css']
})
export class AddTrainingPhraseComponent {
  trainingPhrase: TrainingPhrase= { text: '', intentId: this.data.intentId };
  constructor(
    private questionBankService: QuestionBankService,
    public dialogRef: MatDialogRef<AddTrainingPhraseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { intentId: string }
  ) {}

  onSave() {
    this.questionBankService.addTrainingPhrase(this.data.intentId,this.trainingPhrase).subscribe(trainingPhrase => {
      this.dialogRef.close(trainingPhrase);
    });
  }

}

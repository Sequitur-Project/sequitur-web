import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TrainingPhrase } from '../../models/training-phrase-model';
import { QuestionBankService } from '../../services/question-bank.service';

@Component({
  selector: 'app-edit-training-phrase',
  templateUrl: './edit-training-phrase.component.html',
  styleUrls: ['./edit-training-phrase.component.css']
})
export class EditTrainingPhraseComponent {
  trainingPhrase: TrainingPhrase;

  constructor(
    private questionBankService: QuestionBankService,
    public dialogRef: MatDialogRef<EditTrainingPhraseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { intentId: string, trainingPhraseId: string, trainingPhrase: TrainingPhrase }
  ) {
    this.trainingPhrase = { ...data.trainingPhrase };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.questionBankService.updateTrainingPhrase(this.data.intentId, this.data.trainingPhraseId, this.trainingPhrase)
      .subscribe(updatedTrainingPhrase => {
        console.log('Training phrase updated successfully:', updatedTrainingPhrase);
        this.dialogRef.close(updatedTrainingPhrase);
      }, error => {
        console.error('Error updating training phrase:', error);
      });
  }

}

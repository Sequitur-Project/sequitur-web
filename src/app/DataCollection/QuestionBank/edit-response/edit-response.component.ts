import { Component, Inject } from '@angular/core';
import { ResponseModel } from '../../models/response-model';
import { QuestionBankService } from '../../services/question-bank.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-response',
  templateUrl: './edit-response.component.html',
  styleUrls: ['./edit-response.component.css']
})
export class EditResponseComponent {
  response: ResponseModel;

  constructor(
    private questionBankService: QuestionBankService,
    public dialogRef: MatDialogRef<EditResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { intentId: string, responseId: string, response: ResponseModel }
  ) {
    this.response = { ...data.response };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.questionBankService.updateResponse(this.data.intentId, this.data.responseId, this.response)
      .subscribe(updatedResponse => {
        console.log('Response updated successfully:', updatedResponse);
        this.dialogRef.close(updatedResponse);
      }, error => {
        console.error('Error updating response:', error);
      });
  }

}

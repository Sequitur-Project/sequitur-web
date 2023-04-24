import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseModel } from '../../models/response-model';
import { QuestionBankService } from '../../services/question-bank.service';

@Component({
  selector: 'app-add-response',
  templateUrl: './add-response.component.html',
  styleUrls: ['./add-response.component.css']
})
export class AddResponseComponent {
  response: ResponseModel = {messageText: '', intentId: this.data.intentId};
  constructor(
    private questionBankService: QuestionBankService,
    public dialogRef: MatDialogRef<AddResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { intentId: string }
  ) {}

  onSave() {
    this.questionBankService.addResponse(this.data.intentId,this.response).subscribe(response => {
      this.dialogRef.close(response);
    });
  }

}

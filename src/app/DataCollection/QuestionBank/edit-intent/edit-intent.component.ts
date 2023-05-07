import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Intent } from '../../models/intent-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-intent',
  templateUrl: './edit-intent.component.html',
  styleUrls: ['./edit-intent.component.css']
})
export class EditIntentComponent implements OnInit {
  intent: Intent;

  constructor(
    private dialogRef: MatDialogRef<EditIntentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.intent = this.data.intent;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const updatedIntent: Intent = {
      ...this.intent,
      displayName: this.intent.displayName
    };
    console.log('Updated intent:', updatedIntent);
    this.dialogRef.close(updatedIntent);
  }


}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddRowDialogComponent, DialogData } from '../add-row-dialog/add-row-dialog.component';
import { QuestionBankService } from '../../services/question-bank.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Intent } from '../../models/intent-model';
import { AddTrainingPhraseComponent } from '../add-training-phrase/add-training-phrase.component';
import { AddResponseComponent } from '../add-response/add-response.component';
import { MatIconModule } from '@angular/material/icon';
import { EditIntentComponent } from '../edit-intent/edit-intent.component';
import { TrainingPhrase } from '../../models/training-phrase-model';
import { EditTrainingPhraseComponent } from '../edit-training-phrase/edit-training-phrase.component';
import { ResponseModel } from '../../models/response-model';
import { EditResponseComponent } from '../edit-response/edit-response.component';




@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css']
})
export class QuestionBankComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['displayName', 'trainingPhrases', 'responses', 'createdAt','trainingPhrase','addResponse','editIntent','deleteIntent'];
  dataSource: MatTableDataSource<Intent>;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayNameInput: HTMLInputElement;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private questionBankService: QuestionBankService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Intent>();
    console.log('DataSource: ', this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.refreshTableData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  refreshTableData() {
    this.questionBankService.getQuestionBankData().subscribe((data: any) => {
      console.log('Data retrieved from backend:', data.content);
      this.dataSource.data = data.content;
      console.log('DataSource: ', this.dataSource.data);
    });
  }

  addTrainingPhrase(intent: Intent) {
    const dialogRef = this.dialog.open(AddTrainingPhraseComponent, {
      width: '1000px',
      height: '368px',
      data: {
        intentId: intent.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        intent.trainingPhrases.push(result);
      }
    });
  }

  addResponse(intent: Intent) {
    const dialogRef = this.dialog.open(AddResponseComponent, {
      width: '1000px',
      height: '275px',
      data: {
        intentId: intent.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        intent.responses.push(result);
      }
    });
  }
  editTrainingPhrase(intent: Intent, trainingPhrase: TrainingPhrase) {

    const dialogRef = this.dialog.open(EditTrainingPhraseComponent, {
      width: '50%',
      height:'250px',
      data: {
        intentId: intent.id,
        trainingPhraseId: trainingPhrase.id,
        trainingPhrase: trainingPhrase
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = intent.trainingPhrases.findIndex(tp => tp.id === result.id);
        intent.trainingPhrases[index] = result;
      }
    });
  }

  editResponse(intent: Intent, response: ResponseModel) {
    const dialogRef = this.dialog.open(EditResponseComponent, {
      width: '50%',
      height:'250px',
      data: {
        intentId: intent.id,
        responseId: response.id,
        response: response
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = intent.responses.findIndex(tp => tp.id === result.id);
        intent.responses[index] = result;
      }
    });
  }






  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.dataSource.data.slice(startIndex, endIndex);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRowDialogComponent, {
      width: '25%',
      height: '505px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result) {
        const newIntent: Intent = {
          displayName: result.name,
          trainingPhrases: [],
          responses: [],
          created_at: new Date(),
        };
        this.questionBankService.addIntent(newIntent).subscribe(() => {
          this.refreshTableData();
        });
      }
    });
  }

  edit(intent: Intent): void {
    const dialogRef = this.dialog.open(EditIntentComponent, {
      width: '50%',
      height:'250px',
      data: {
        intent: intent
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        intent.displayName = result.displayName;
        this.questionBankService.updateIntent(intent).subscribe(() => {
          console.log('Intent updated successfully!');
          this.refreshTableData();
        }, (error) => {
          console.error('Error updating intent:', error);
        });
      }
    });
  }

  deleteIntent(intent: Intent): void {
    if (confirm(`Are you sure you want to delete the "${intent.displayName}" intent?`)) {
      this.questionBankService.deleteIntent(intent.id).subscribe(() => {
        console.log('Intent deleted successfully!');
        this.refreshTableData();
      }, (error) => {
        console.error('Error deleting intent:', error);
      });
    }
  }

  deleteTrainingPhrase(intent: Intent, trainingPhrase: TrainingPhrase) {
    if (confirm(`Are you sure you want to delete the "${trainingPhrase.text}" training Phrase?`)){
    this.questionBankService.deleteTrainingPhrase(intent.id, trainingPhrase.id)
      .subscribe(() => {
        const index = intent.trainingPhrases.indexOf(trainingPhrase);
        intent.trainingPhrases.splice(index, 1);
      }, error => {
        console.error('Error deleting training phrase:', error);
      });
    }
  }

  deleteResponse(intent: Intent, response: ResponseModel) {
    if (confirm(`Are you sure you want to delete the "${response.messageText}" response?`)){
    this.questionBankService.deleteResponse(intent.id, response.id)
      .subscribe(() => {
        const index = intent.responses.indexOf(response);
        intent.responses.splice(index, 1);
      }, error => {
        console.error('Error deleting response:', error);
      });
    }
  }


}




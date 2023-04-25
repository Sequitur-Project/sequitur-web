import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ResultsComponent } from './core/results/results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { QuestionBankComponent } from './DataCollection/QuestionBank/question-bank/question-bank.component';
import { AddRowDialogComponent } from './DataCollection/QuestionBank/add-row-dialog/add-row-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { QuestionBankService } from './DataCollection/services/question-bank.service';
import { AddTrainingPhraseComponent } from './DataCollection/QuestionBank/add-training-phrase/add-training-phrase.component';
import { AddResponseComponent } from './DataCollection/QuestionBank/add-response/add-response.component';
import { MatIconModule } from '@angular/material/icon';
import { EditIntentComponent } from './DataCollection/QuestionBank/edit-intent/edit-intent.component';
import { MatMenuModule } from '@angular/material/menu';
import { EditTrainingPhraseComponent } from './DataCollection/QuestionBank/edit-training-phrase/edit-training-phrase.component';
import { EditResponseComponent } from './DataCollection/QuestionBank/edit-response/edit-response.component';
import { ListStudentsComponent } from './DiagnosticTreatment/list-students/list-students.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SidebarComponent,
    ResultsComponent,
    QuestionBankComponent,
    AddRowDialogComponent,
    AddTrainingPhraseComponent,
    AddResponseComponent,
    EditIntentComponent,
    EditTrainingPhraseComponent,
    EditResponseComponent,
    ListStudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [
    QuestionBankService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

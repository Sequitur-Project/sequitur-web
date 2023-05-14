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
import { ResultsInfoComponent } from './DiagnosticTreatment/results-info/results-info.component';
import { ShortDateComponent } from './DiagnosticTreatment/pipes/short-date/short-date.component';
import { CreateRecommendationComponent } from './DiagnosticTreatment/create-recommendation/create-recommendation.component';
import { AppointmentComponent } from './ProactiveCommunication/appointment/appointment.component';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { SubscriptionInfoComponent } from './Subscription/subscription-info/subscription-info.component';
import { SupportComponent } from './ProactiveCommunication/support/support.component';
import { StudentListComponent } from './IdentityAndAccessManagament/student-list/student-list.component';
import { PsychologistListComponent } from './IdentityAndAccessManagament/psychologist-list/psychologist-list.component';
import { PaymentInfoComponent } from './Subscription/payment-info/payment-info.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



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
    ListStudentsComponent,
    ResultsInfoComponent,
    ShortDateComponent,
    CreateRecommendationComponent,
    AppointmentComponent,
    SubscriptionInfoComponent,
    SupportComponent,
    StudentListComponent,
    PsychologistListComponent,
    PaymentInfoComponent,
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  providers: [
    QuestionBankService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

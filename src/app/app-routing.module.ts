import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { QuestionBankComponent } from './DataCollection/QuestionBank/question-bank/question-bank.component';
import { ListStudentsComponent } from './DiagnosticTreatment/list-students/list-students.component';
import { SubscriptionInfoComponent } from './Subscription/subscription-info/subscription-info.component';
import { SupportComponent } from './ProactiveCommunication/support/support.component';
import { StudentListComponent } from './IdentityAndAccessManagament/student-list/student-list.component';
import { PsychologistListComponent } from './IdentityAndAccessManagament/psychologist-list/psychologist-list.component';
import { StatisticsComponent } from './DiagnosticTreatment/statistics/statistics.component';
import { ManagerProfileComponent } from './IdentityAndAccessManagament/manager-profile/manager-profile.component';
import { PsychologistProfileComponent } from './IdentityAndAccessManagament/psychologist-profile/psychologist-profile.component';
import { ViewAppointmentsComponent } from './ProactiveCommunication/view-appointments/view-appointments.component';
import { RegisterManagerComponent } from './user/register-manager/register-manager.component';
import { HomeComponent } from './shared/home/home.component';
import { HomePsychologistComponent } from './shared/home-psychologist/home-psychologist.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'homePsychologist', component: HomePsychologistComponent },
  { path: 'register', component: RegisterManagerComponent},
  { path: 'register/2', component: RegisterComponent},
  { path: 'students', component: StudentListComponent},
  { path: 'profile', component: ManagerProfileComponent},
  { path: 'psychologistProfile', component: PsychologistProfileComponent},
  { path: 'psychologists', component: PsychologistListComponent},
  { path: 'statistics', component: StatisticsComponent},
  { path: 'results', component: ListStudentsComponent},
  { path: 'questionBank', component: QuestionBankComponent},
  { path: 'subscriptions', component: SubscriptionInfoComponent},
  { path: 'support', component: SupportComponent},
  { path: 'appointments', component: ViewAppointmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

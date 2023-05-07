import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './core/results/results.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { QuestionBankComponent } from './DataCollection/QuestionBank/question-bank/question-bank.component';
import { ListStudentsComponent } from './DiagnosticTreatment/list-students/list-students.component';
import { SubscriptionInfoComponent } from './Subscription/subscription-info/subscription-info.component';
import { SupportComponent } from './ProactiveCommunication/support/support.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'results', component: ListStudentsComponent},
  { path: 'questionBank', component: QuestionBankComponent},
  { path: 'subscriptions', component: SubscriptionInfoComponent},
  { path: 'support', component: SupportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

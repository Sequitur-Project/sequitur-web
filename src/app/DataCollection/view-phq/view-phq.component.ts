import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConversationService } from '../services/conversation.service';


@Component({
  selector: 'app-view-phq',
  templateUrl: './view-phq.component.html',
  styleUrls: ['./view-phq.component.css']
})
export class ViewPhqComponent {
  isfinishedLoading: boolean = false;
  phqNotFound: boolean = false;

  phqQuestions: string[] = [
    'Poco interés o placer en hacer cosas.',
    'Sentirse deprimido(a) o sin esperanza.',
    'Problemas para conciliar el sueño, permanecer dormido(a) o dormir demasiado.',
    'Sentirse cansado(a) o sin energía.',
    'Pérdida de apetito o comer en exceso.',
    'Sentirse mal consigo mismo(a) o como un fracaso, o haber defraudado a usted mismo(a) o a su familia.',
    'Dificultad para concentrarse en cosas como leer el periódico o ver televisión.',
    'Movimientos o habla más lentos de lo normal, o lo contrario: estar tan inquieto(a) o agitado(a) que ha estado moviéndose mucho más de lo habitual.',
    'Pensamientos de que estaría mejor muerto(a) o de hacerse daño de alguna manera.'
  ];
  phqAnswers: string[] = [];

  constructor(
    private conversationService: ConversationService,
    public dialogRef: MatDialogRef<ViewPhqComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { student: any }
  ) {
    this.getPhqAnswers();
  }

 getPhqAnswers(): void {
  const studentId = this.data.student.id;

  this.conversationService.getConversationByStudentId(studentId)
    .subscribe(
      (conversation) => {
        if (conversation && conversation.studentMessages) {
          const answers: string[] = conversation.studentMessages
            .filter((message) => this.isPhqAnswer(message.message))
            .map((message) => message.message);

          this.phqAnswers = answers;

          if (answers.length === 0) {
            this.phqNotFound = true;
          }
        } else {
          this.phqNotFound = true;
        }

        setTimeout(() => {
          this.isfinishedLoading = true;
        }, 200);
      },
      (error) => {
        console.error('Error retrieving PHQ-9 answers', error);
        this.phqNotFound = true;
        this.isfinishedLoading = true;
      }
    );
}


  isPhqAnswer(message: string): boolean {
    const answerValue = parseInt(message, 10);
    return !isNaN(answerValue) && answerValue >= 0 && answerValue <= 3;
  }
  phqAnswerOptions: string[] = ['0', '1', '2', '3'];

selectPhqAnswer(questionIndex: number, answer: string): void {
  this.phqAnswers[questionIndex] = answer;
}
phqOptions: string[] = [
  'No en absoluto',
  'En varios días',
  'Más de la mitad de los días',
  'Casi todos los días'
];
selectedAnswers: number[] = [];



  isSelected(questionIndex: number, optionIndex: number): boolean {
    return this.selectedAnswers[questionIndex] === optionIndex;
  }
  isSelectedAnswer(questionIndex: number, answerIndex: number): boolean {
    const answer = this.phqAnswers[questionIndex];
    return answer !== null && answer === answerIndex.toString();
  }

  isAnswered(questionIndex: number): boolean {
    const answer = this.phqAnswers[questionIndex];
    return answer !== null;
  }

  selectAnswer(questionIndex: number, answerIndex: number): void {
    this.phqAnswers[questionIndex] = answerIndex.toString();
  }




  closeDialog(): void {
    this.dialogRef.close();
  }
}

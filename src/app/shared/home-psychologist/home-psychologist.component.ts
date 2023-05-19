import { Component } from '@angular/core';
import { Psychologist } from 'src/app/IdentityAndAccessManagament/models/psychologist';
import { PsychologistService } from 'src/app/user/services/login.service';

@Component({
  selector: 'app-home-psychologist',
  templateUrl: './home-psychologist.component.html',
  styleUrls: ['./home-psychologist.component.css']
})
export class HomePsychologistComponent {

  loggedInPsychologist: Psychologist | undefined;

  constructor(private psychologistService: PsychologistService) {}

  ngOnInit() {
    this.loggedInPsychologist = this.psychologistService.getLoggedInPsychologist();
  }

}

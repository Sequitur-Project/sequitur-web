import { Component } from '@angular/core';
import { PsychologistService } from 'src/app/user/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  loggedInPsychologist: any;

  constructor(private psychologistService: PsychologistService) {
    this.loggedInPsychologist = psychologistService.getLoggedInPsychologist();
  }

}

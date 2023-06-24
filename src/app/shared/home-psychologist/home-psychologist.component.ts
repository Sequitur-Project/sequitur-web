import { Component } from '@angular/core';
import { Psychologist } from 'src/app/IdentityAndAccessManagament/models/psychologist';
import { PsychologistService } from 'src/app/user/services/login.service';
import { AppointmentService } from 'src/app/ProactiveCommunication/services/appointment.service';
import { AppointmentResource } from 'src/app/ProactiveCommunication/models/appointment-resource';

@Component({
  selector: 'app-home-psychologist',
  templateUrl: './home-psychologist.component.html',
  styleUrls: ['./home-psychologist.component.css']
})
export class HomePsychologistComponent {
  appointmentsToday: AppointmentResource[] = [];
  loggedInPsychologist: Psychologist | undefined;
  hasAppointmentsToday: boolean = false;
  today = new Date();


  constructor(private psychologistService: PsychologistService, private appointmentsService: AppointmentService) {}

  ngOnInit() {
    this.loggedInPsychologist = this.psychologistService.getLoggedInPsychologist();
    this.loadTodaysAppointments();
  }

  loadTodaysAppointments(): void {
    this.hasAppointmentsToday = false;
    const psychologistId = this.psychologistService.getLoggedInPsychologist()?.id ?? '';
    var today = new Date();
    if (psychologistId) {
      this.appointmentsService.getAllAppointmentsByPsychologistId(psychologistId)
        .subscribe(appointments => {          
          appointments.forEach(appointment=> {
            var appointdate = new Date(appointment.appointmentDate);
            console.log(appointdate);
            if(appointdate.setHours(0,0,0,0) == today.setHours(0,0,0,0) ){
                console.log("wawa");
                this.appointmentsToday.push(appointment);
                this.hasAppointmentsToday = true;
            }                        
         });
         console.log('Appointments:', this.appointmentsToday);       
          
        }, error => {
          console.error('Error loading appointments:', error);
        });
    } else {
      console.error('Psychologist ID is undefined.');
    }
  }

}

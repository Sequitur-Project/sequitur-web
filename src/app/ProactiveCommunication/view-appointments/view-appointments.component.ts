import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { PsychologistService } from 'src/app/user/services/login.service';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css']
})
export class ViewAppointmentsComponent implements OnInit {
  calendarOptions: CalendarOptions; // Define the calendar options
  constructor(private psychologistService: PsychologistService, private appointmentsService: AppointmentService) { }

  ngOnInit() {
    this.loadAppointments();
    this.calendarOptions = {
      // Configure the calendar options
      eventColor: '#16B268',
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin], // Set the initial view (e.g., month)
      events: [

      ]
    };
  }

  loadAppointments(): void {
    const psychologistId = this.psychologistService.getLoggedInPsychologist()?.id ?? '';
    if (psychologistId) {
      this.appointmentsService.getAllAppointmentsByPsychologistId(psychologistId)
        .subscribe(appointments => {
          console.log('Appointments:', appointments);
          this.calendarOptions = {
            // Configure the calendar options
            events: appointments.map(appointment => ({
              title: 'Cita '+ appointment.appointmentTime,
              start: new Date(appointment.appointmentDate).toISOString()

            }))
          };
        }, error => {
          console.error('Error loading appointments:', error);
        });
    } else {
      console.error('Psychologist ID is undefined.');
    }
  }
}

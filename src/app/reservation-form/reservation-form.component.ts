import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});
 
  constructor(
    private formBuilder: FormBuilder, 
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
     this.reservationForm = this.formBuilder.group({
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      checkInDate:['', Validators.required],
      checkOutDate:['', Validators.required],
      roomNumber: ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.reservationService.getReservationById(id).subscribe(reservation => {
        if (reservation) {
          this.reservationForm.patchValue(reservation);
        }
      });
    }

  }

  onSubmit() {
    
    if (this.reservationForm.valid) {
      // Process the reservation form data
      let reservation: Reservation = this.reservationForm.value;
      
      //update the reservation ID if it exists
      let reservationId = this.activatedRoute.snapshot.paramMap.get('id');
      
      if (reservationId) {
        this.reservationService.updateReservation(reservationId, reservation).subscribe(
          () => {
            alert('Reservation updated works!');
          }
        );
      } else {
      // Add the reservation using the service
       this.reservationService.addReservation(reservation).subscribe(
        () => {
          alert('Reservation added works!');
        }
       );
      }

      this.router.navigate(['/list'])

    } else{
      console.log("invalid");
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe( 
      reservationList => {this.reservations = reservationList;
    });
  }


  deleteReservation(id:string): void {
    if(confirm("Are you sure you want to delete this reservation?")) {
      this.reservationService.deleteReservation(id).subscribe(() =>{
        alert("Reservation deleted successfully");
      });
    }
  }


}

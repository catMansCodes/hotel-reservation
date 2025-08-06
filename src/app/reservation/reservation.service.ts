import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor(){
    let storedReservations = localStorage.getItem("reservations");

    if (storedReservations) {
      this.reservations = JSON.parse(storedReservations);
    } else{
      this.reservations = [];
    }
  }
  
  //CRUD operations for reservations
  
  // 1. Get list of reservations
  getReservations(): Reservation[]{
    return this.reservations;
  }

  // 2. Get a reservation by ID
  getReservationById(id: string):Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  // 3. Add a new reservation
  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString(); // Generate a unique ID
    this.reservations.push(reservation);

    // Optionally, save to local storage or any other persistent storage
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  // 4. Update an existing reservation
  updateReservation(reservationId: string, updateReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === reservationId);
      this.reservations[index] = updateReservation;

    // Optionally, save to local storage or any other persistent storage
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  // 5. Delete a reservation
  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);

    // Optionally, save to local storage or any other persistent storage
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }


}

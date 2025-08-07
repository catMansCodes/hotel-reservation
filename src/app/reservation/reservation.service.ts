import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  private apiUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }
  
  //CRUD operations for reservations
  
  // 1. Get list of reservations
  getReservations(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.apiUrl+ "/reservations");
  }

  // 2. Get a reservation by ID
  getReservationById(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + "/reservation/"+ id);
  }

  // 3. Add a new reservation
  addReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(this.apiUrl + "/reservation", reservation); 
  }

  // 4. Update an existing reservation
  updateReservation(id: string, updateReservation: Reservation): Observable<void> {
    return this.http.put<void>(this.apiUrl + "/reservation/" + id, updateReservation)
  }

  // 5. Delete a reservation
  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/reservation/" + id);
  }


}

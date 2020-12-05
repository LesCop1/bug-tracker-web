import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developer } from '../models/developer.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Developer[]> {
    return this.http.get<Developer[]>('developers');
  }

  create(dev: Developer): Observable<Developer> {
    return this.http.post<Developer>('developers', dev);
  }

  get(id: number): Observable<Developer> {
    return this.http.get<Developer>(`developers/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`developers/${id}`);
  }
}

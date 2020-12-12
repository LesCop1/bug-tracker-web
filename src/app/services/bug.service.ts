import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Bug } from '../models/bug.model';

@Injectable({
  providedIn: 'root',
})
export class BugService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Bug[]> {
    return this.http.get<Bug[]>('bugs');
  }

  update(bug: Bug): Observable<any> {
    return this.http.put(`bugs/${bug.id}`, bug);
  }

  create(bug: Bug): Observable<Bug> {
    return this.http.post<Bug>('bugs', bug);
  }

  get(id: number): Observable<Bug> {
    return this.http.get<Bug>(`bugs/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`bugs/${id}`);
  }
}

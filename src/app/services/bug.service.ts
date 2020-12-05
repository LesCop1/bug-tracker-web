import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Bug, Priority, Progress } from '../models/bug.model';

@Injectable({
  providedIn: 'root',
})
export class BugService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Bug[]> {
    return this.http.get<Bug[]>('bugs');
  }

  create(title: string, description: string, priority?: Priority, progress?: Progress): Observable<Bug> {
    return this.http.post<Bug>('bugs', {title, description, priority, progress});
  }

  get(id: number): Observable<Bug> {
    return this.http.get<Bug>(`bugs/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`bugs/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Developer } from '../models/developer.model';
import { Token } from '../api/token.response';
import { SignupResponse } from '../api/signup.response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<Developer>;

  constructor(private http: HttpClient, private jwt: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    const storedToken = localStorage.getItem('auth_token');

    if (storedToken) {
      const token: Token = JSON.parse(storedToken);
      const userId = this.jwt.decodeToken(token.accessToken).sub;

      this.fetchCurrentUser(userId).subscribe();
    }
  }

  public get currentUserValue(): Developer {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string): Observable<Developer> {
    return this.http
      .post<Token>('auth/signin', { username, password })
      .pipe(
        mergeMap((response: Token) => {
          localStorage.setItem('auth_token', JSON.stringify(response));

          const userId = this.jwt.decodeToken(response.accessToken).sub;
          return this.fetchCurrentUser(userId);
        })
      );
  }

  public register(username: string, password: string, name: string): Observable<Developer> {
    return this.http
      .post<SignupResponse>('auth/signup', { username, password, name })
      .pipe(
        mergeMap((response: SignupResponse) => {
          return this.login(username, password);
        })
      );
  }

  public checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.post<boolean>('auth/checkUsernameAvailability', { username });
  }

  public logout(): void {
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
  }

  private fetchCurrentUser(id: number): Observable<Developer> {
    return this.http.get<Developer>(`developers/${id}`).pipe(
      catchError((err) => {
        localStorage.removeItem('auth_token');
        this.currentUserSubject.next(null);
        return throwError(err);
      }),
      map((user: Developer) => {
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }
}

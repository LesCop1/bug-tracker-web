import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiRequest = request.clone({ url: `${API_URL}/${request.url}` });
    return next.handle(apiRequest);
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtModule } from '@auth0/angular-jwt';

import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { BugsComponent } from './components/bugs/bugs.component';
import { EnumNamePipe, ListComponent } from './components/bugs/list/list.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditorComponent } from './components/bugs/editor/editor.component';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { ApiInterceptor } from './api/api.interceptor';


import { Token } from './api/token.response';
import { UsernameValidatorDirective } from './components/signup/username.validator';

export function tokenGetter(): string | null {
  const storedToken = localStorage.getItem('auth_token');

  if (storedToken) {
    const token: Token = JSON.parse(storedToken);
    return token.accessToken;
  }

  return null;
}

@NgModule({
  declarations: [
    AppComponent,
    BugsComponent,
    SigninComponent,
    SignupComponent,
    EditorComponent,
    ListComponent,
    UsernameValidatorDirective,
    EnumNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:8080'],
      },
    }),
    NgBootstrapFormValidationModule.forRoot(),
  ],
  providers: [AuthenticationService, UserService, { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}

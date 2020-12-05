import { Directive, forwardRef, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class UsernameValidator implements AsyncValidator {
  constructor(private authService: AuthenticationService) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.authService.checkUsernameAvailability(ctrl.value).pipe(
      map((exists) => {
          return (exists ? { uniqueUsername: true } : null);
      }),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appUsernameValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UsernameValidator),
      multi: true,
    },
  ],
})
export class UsernameValidatorDirective {
  constructor(private validator: UsernameValidator) {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}

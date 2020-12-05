import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class PasswordValidator implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.get('password')?.value !== control.get('confirmPassword')?.value) {
      control.get('confirmPassword')?.setErrors({ invalid: true });
      return { invalid: true };
    }

    return null;
  }
}

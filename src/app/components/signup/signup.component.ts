import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { PasswordValidator } from './password.validator';
import { UsernameValidator } from './username.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public authService: AuthenticationService,
    public formBuilder: FormBuilder,
    private usernameValidator: UsernameValidator,
    private passwordValidator: PasswordValidator
  ) {
    this.signupForm = this.formBuilder.group({
      name: '',
      username: new FormControl('', {
        asyncValidators: [this.usernameValidator.validate.bind(this.usernameValidator)],
        updateOn: 'blur',
      }),
      passwords: new FormGroup(
        {
          password: new FormControl(''),
          confirmPassword: new FormControl(''),
        },
        { validators: [this.passwordValidator.validate.bind(this.passwordValidator)], updateOn: 'change' }
      ),
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    this.authService.register(this.username?.value, this.password?.value, this.name?.value).subscribe((user) => {
      this.activeModal.close();
    });
  }

  get name(): AbstractControl | null {
    return this.signupForm.get('name');
  }

  get username(): AbstractControl | null {
    return this.signupForm.get('username');
  }

  get passwords(): AbstractControl | null {
    return this.signupForm.get('passwords');
  }

  get password(): AbstractControl | null {
    return this.signupForm.get('passwords.password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.signupForm.get('passwords.confirmPassword');
  }
}

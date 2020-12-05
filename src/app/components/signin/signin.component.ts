import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, Form, AbstractControl } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, public authService: AuthenticationService, public formBuilder: FormBuilder) {
    this.signinForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.authService.login(this.username?.value, this.password?.value).subscribe((user) => {
      this.activeModal.close();
    });
  }

  get username(): AbstractControl | null {
    return this.signinForm.get('username');
  }

  get password(): AbstractControl | null {
    return this.signinForm.get('password');
  }
}

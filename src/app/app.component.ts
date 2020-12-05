import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Developer } from 'src/app/models/developer.model';

import { SigninComponent } from 'src/app/components/signin/signin.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';

import { AuthenticationService } from 'src/app/services/authentication.service';

import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  collapsed = true;
  currentUser?: Developer;
  currentUserSubscription: Subscription;

  isDevMode = isDevMode;

  constructor(private modalService: NgbModal, private authService: AuthenticationService) {
    this.currentUserSubscription = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  signOut(): void {
    this.authService.logout();
  }

  openSignupModal(): void {
    this.modalService.open(SignupComponent);
  }

  openSigninModal(): void {
    this.modalService.open(SigninComponent);
  }
}

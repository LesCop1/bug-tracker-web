import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Developer } from 'src/app/models/developer.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user?: Developer;

  loaded = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userService.getByUsername(params.get('username') || this.authService.currentUserValue.username).subscribe((user: Developer) => {
        this.user = user;
        this.loaded = true;
      });
    });
  }
}

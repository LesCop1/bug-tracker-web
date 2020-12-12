import { Component, OnInit } from '@angular/core';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Developer } from 'src/app/models/developer.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { DeleteModalComponent } from '../modals/delete/delete.component';
import { UserEditorComponent } from './editor/editor.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users?: Developer[];

  loaded = false;

  faTrash = faTrash;
  faPen = faPen;
  faPlus = faPlus;

  constructor(private userService: UserService, private authService: AuthenticationService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((developers: Developer[]) => {
      this.users = developers;
      this.loaded = true;
    });
  }

  editUser(user: Developer): void {
    const modal = this.modalService.open(UserEditorComponent);

    modal.componentInstance.user = user;
    modal.result.then((result) => {
      if (result && user.id) {
        this.userService.update({...user, ...result}).subscribe(() => {
          this.users = this.users?.filter((u) => u.id === user.id);
          this.users?.push({...user, ...result});
        });
      }
    }).catch();
  }

  deleteUser(user: Developer): void {
    const modal = this.modalService.open(DeleteModalComponent);

    modal.componentInstance.item = 'this user';
    modal.result.then((result) => {
      if (result && user.id) {
        this.userService.delete(user.id).subscribe(() => {
          this.users = this.users?.filter((u) => u.id === user.id);
        });
      }
    }).catch();
  }

  get currentUser(): Developer {
    return this.authService.currentUserValue;
  }
}

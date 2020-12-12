import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Developer } from 'src/app/models/developer.model';

@Component({
  selector: 'app-bugs-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class UserEditorComponent {
  @Input() editForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public activeModal: NgbActiveModal) {
    this.editForm = this.formBuilder.group({
      id: new FormControl({ value: '', disabled: true }),
      username: new FormControl({ value: '', disabled: true }),
      name: '',
      password: '',
    });
  }

  onSubmit(): void {
    this.activeModal.close({
      id: this.id?.value,
      username: this.username?.value,
      name: this.name?.value,
      password: this.password?.value,
    } as Developer);
  }

  set user(user: Developer) {
    this.id?.setValue(user.id);
    this.username?.setValue(user.username);
    this.name?.setValue(user.name);
  }

  get id(): AbstractControl | null {
    return this.editForm.get('id');
  }

  get username(): AbstractControl | null {
    return this.editForm.get('username');
  }

  get name(): AbstractControl | null {
    return this.editForm.get('name');
  }

  get password(): AbstractControl | null {
    return this.editForm.get('password');
  }
}

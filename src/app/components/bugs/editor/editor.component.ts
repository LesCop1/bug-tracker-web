import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Bug } from 'src/app/models/bug.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Developer } from 'src/app/models/developer.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bugs-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class BugEditorComponent implements OnInit {
  @Input() editForm: FormGroup;

  private users?: Developer[];

  public model: any;

  search = (text$: Observable<string>) =>
    text$.pipe(
      map((term) => (term === '' ? [] : this.users ? this.users.filter((u) => u.username.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10) : []))
    );

  formatter = (x: Developer) => x.username;

  constructor(public formBuilder: FormBuilder, public userService: UserService, public activeModal: NgbActiveModal) {
    this.editForm = this.formBuilder.group({
      title: '',
      description: '',
      priority: '',
      progress: '',
      assignee: '',
    });
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe((users: Developer[]) => {
      this.users = users;
    });
  }

  onSubmit(): void {
    this.activeModal.close({
      title: this.title?.value,
      description: this.description?.value,
      priority: this.priority?.value,
      progress: this.progress?.value,
      assignee: this.assignee?.value,
    });
  }

  set bug(bug: Bug) {
    this.title?.setValue(bug.title);
    this.description?.setValue(bug.description);
    this.priority?.setValue(bug.priority);
    this.progress?.setValue(bug.progress);
    this.assignee?.setValue(bug.assignee?.username);
  }

  get title(): AbstractControl | null {
    return this.editForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.editForm.get('description');
  }

  get priority(): AbstractControl | null {
    return this.editForm.get('priority');
  }

  get progress(): AbstractControl | null {
    return this.editForm.get('progress');
  }

  get assignee(): AbstractControl | null {
    return this.editForm.get('assignee');
  }
}

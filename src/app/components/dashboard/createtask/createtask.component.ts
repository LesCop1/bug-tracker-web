import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Bug } from 'src/app/models/bug.model';
import { BugService } from 'src/app/services/bug.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.scss'],
})
export class CreatetaskComponent {
  createForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private bugService: BugService, public activeModal: NgbActiveModal) {
    this.createForm = this.formBuilder.group({
      title: '',
      description: '',
      priority: '',
      progress: '',
    });
  }

  onSubmit(): void {
    this.bugService.create(this.title?.value, this.description?.value, this.priority?.value, this.progress?.value).subscribe((created: Bug) => {
      this.activeModal.close(created);
    });
  }

  get title(): AbstractControl | null {
    return this.createForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.createForm.get('description');
  }

  get priority(): AbstractControl | null {
    return this.createForm.get('priority');
  }

  get progress(): AbstractControl | null {
    return this.createForm.get('progress');
  }
}

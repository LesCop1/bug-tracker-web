import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Bug } from 'src/app/models/bug.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bugs-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  @Input() editForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public activeModal: NgbActiveModal) {
    this.editForm = this.formBuilder.group({
      title: '',
      description: '',
      priority: '',
      progress: '',
    });
  }

  onSubmit(): void {
    this.activeModal.close({
      title: this.title?.value,
      description: this.description?.value,
      priority: this.priority?.value,
      progress: this.progress?.value,
    } as Bug);
  }

  set bug(bug: Bug) {
    this.title?.setValue(bug.title);
    this.description?.setValue(bug.description);
    this.priority?.setValue(bug.priority);
    this.progress?.setValue(bug.progress);
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
}

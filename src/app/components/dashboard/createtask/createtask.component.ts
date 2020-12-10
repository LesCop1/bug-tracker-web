import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Bug, Priority, Progress } from 'src/app/models/bug.model';
import { BugService } from 'src/app/services/bug.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.scss'],
})
export class CreatetaskComponent implements OnInit {
  private formSubmitAttempt: boolean = false;
  formGroup: FormGroup = new FormGroup({});

  @Output() createEvent = new EventEmitter<Bug>();
  
  constructor(public formBuilder: FormBuilder, private bugService: BugService, public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(20)]],
      description: [null, [Validators.required, Validators.maxLength(200)]],
      priority: [null, [Validators.required]],
      progress: [null, [Validators.required]],
    });
  }

  isFieldValid(field: string) {
    return (!this.formGroup.get(field)!.valid && this.formGroup.get(field)!.touched) ||
    (this.formGroup.get(field)!.untouched && this.formSubmitAttempt);
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit(bugData: Bug){
    this.formSubmitAttempt = true;
    if (this.formGroup.valid) {
      this.bugService.create(bugData.title, bugData.description, bugData.priority, bugData.progress).subscribe((create: Bug) => {
        this.activeModal.close();
        this.createEvent.emit(create);      
      });
      
    } else {
      this.validateAllFormFields(this.formGroup);
    }
  }

  onReset() {
    this.formGroup.reset();
    this.formSubmitAttempt = false;
  }
}

import { Component, EventEmitter, Input, Output, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bug, Priority } from 'src/app/models/bug.model';
import { BugService } from 'src/app/services/bug.service';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bugs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() title?: string;

  @Input() bugs?: Bug[];

  @Output() deleteEvent = new EventEmitter<Bug>();
  @Output() createEvent = new EventEmitter<Bug>();
  @Output() updateEvent = new EventEmitter<Bug>();

  faPlus = faPlus;

  constructor(private bugService: BugService, private modalService: NgbModal) {}

  deleteBug(confirmModal: TemplateRef<any>, bug: Bug): void {
    const modal = this.modalService.open(confirmModal);

    modal.result
      .then((result) => {
        if (result && bug.id) {
          this.bugService.delete(bug.id).subscribe(() => {
            this.deleteEvent.emit(bug);
          });
        }
      })
      .catch();
  }

  duplicateBug(bug: Bug): void {
    const modal = this.modalService.open(EditorComponent);

    modal.componentInstance.bug = bug;
    modal.result.then((edited: Bug) => {
      this.bugService.create({ ...bug, ...edited }).subscribe((created) => {
        this.createEvent.emit(created);
      });
    });
  }

  editBug(bug: Bug): void {
    const modal = this.modalService.open(EditorComponent);

    modal.componentInstance.bug = bug;
    modal.result.then((edited: Bug) => {
      this.bugService.update({ ...bug, ...edited }).subscribe(() => {
        this.updateEvent.emit({ ...bug, ...edited });
      });
    });
  }

  openCreateBugModal(): void {
    const modal = this.modalService.open(EditorComponent);

    modal.result.then((bug: Bug) => {
      this.bugService.create(bug).subscribe((created) => {
        this.createEvent.emit(created);
      });
    });
  }

  priorityBadgeClass(bug: Bug): any {
    return {
      'badge-info': bug.priority === 0,
      'badge-warning': bug.priority === 1,
      'badge-danger': bug.priority === 2,
    };
  }
}

@Pipe({ name: 'enumName' })
export class EnumNamePipe implements PipeTransform {
  transform(value: number): string {
    return Priority[value];
  }
}

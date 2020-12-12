import { Component, EventEmitter, Input, Output, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { BugEditorComponent } from '../editor/editor.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bug, Priority } from 'src/app/models/bug.model';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DeleteModalComponent } from '../../modals/delete/delete.component';

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

  constructor(private modalService: NgbModal) {}

  openCreateBugModal(): void {
    const modal = this.modalService.open(BugEditorComponent);

    modal.result
      .then((bug: Bug) => {
        this.createEvent.emit(bug);
      })
      .catch();
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

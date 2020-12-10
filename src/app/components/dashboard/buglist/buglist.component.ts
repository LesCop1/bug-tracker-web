import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bug } from 'src/app/models/bug.model';
import { BugService } from 'src/app/services/bug.service';
import { CreatetaskComponent } from '../createtask/createtask.component';

@Component({
  selector: 'app-buglist',
  templateUrl: './buglist.component.html',
  styleUrls: ['./buglist.component.scss'],
})
export class BugListComponent implements OnInit {
  @Input() title?: string;

  @Input() bugs?: Bug[];

  @Output() duplicateEvent = new EventEmitter<Bug>();
  @Output() deleteEvent = new EventEmitter<Bug>();
  

  constructor(private bugService: BugService, private modalService: NgbModal) {}

  ngOnInit(): void {}

  deleteBug(bug: Bug): void {
    this.bugService.delete(bug.id).subscribe(() => {
      this.deleteEvent.emit(bug);
    });
  }

  duplicateBug(bug: Bug): void {
    this.bugService.create(bug.title, bug.description, bug.priority, bug.progress).subscribe((duplicate: Bug) => {
      this.duplicateEvent.emit(duplicate);
    });
  }

  openCreateBugModal(): void {
    this.modalService.open(CreatetaskComponent);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bug } from 'src/app/models/bug.model';
import { BugService } from 'src/app/services/bug.service';

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

  constructor(private bugService: BugService) {}

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
}

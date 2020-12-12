import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bug } from 'src/app/models/bug.model';
import { BugService } from 'src/app/services/bug.service';
import { DeleteModalComponent } from '../../modals/delete/delete.component';
import { BugEditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  bug?: Bug;

  faTrash = faTrash;
  faPen = faPen;

  loaded = false;

  constructor(private route: ActivatedRoute, private router: Router, private bugService: BugService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.bugService.get(+id).subscribe((bug: Bug) => {
          this.bug = bug;
          this.loaded = true;
        });
      }
    });
  }

  editBug(bug: Bug): void {
    const modal = this.modalService.open(BugEditorComponent);

    modal.componentInstance.bug = bug;
    modal.result
      .then((edited: Bug) => {
        this.bugService.update({ ...bug, ...edited }).subscribe(() => {
          this.bug = { ...bug, ...edited };
        });
      })
      .catch();
  }

  deleteBug(bug: Bug): void {
    const modal = this.modalService.open(DeleteModalComponent);

    modal.componentInstance.item = 'this bug';
    modal.result
      .then((result) => {
        if (result) {
          this.bugService.delete(bug.id).subscribe(() => {
            this.router.navigate(['/bugs']);
          });
        }
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

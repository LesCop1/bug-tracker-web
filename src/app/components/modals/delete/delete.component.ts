import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Input() item?: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
}

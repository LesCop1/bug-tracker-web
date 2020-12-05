import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private bugService: BugService) {}

  ngOnInit(): void {
  }
}

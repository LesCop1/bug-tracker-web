import { Component, OnInit } from '@angular/core';
import { Bug, Priority, Progress } from 'src/app/models/bug.model';
import { BugService } from 'src/app/services/bug.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  bugs?: Bug[];

  constructor(private bugService: BugService) {

  }

  ngOnInit(): void {
    this.bugService.getAll().subscribe((result: Bug[]) => {
      console.log(result);
      this.bugs = result;
    });
  }

  deleteBug(bug: Bug): void {
    this.bugs = this.bugs?.filter(b => b !== bug);
  }

  duplicateBug(bug: Bug): void {
    this.bugs?.push(bug);
  }
  
  get todoBugs(): Bug[] | undefined {
    return this.bugs?.filter(b => b.progress === Progress.TODO);
  }

  get doingBugs(): Bug[] | undefined {
    return this.bugs?.filter(b => b.progress === Progress.DOING);
  }

  get doneBugs(): Bug[] | undefined {
    return this.bugs?.filter(b => b.progress === Progress.DONE);
  }
}

import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Bug, Progress } from 'src/app/models/bug.model';
import { BugService } from 'src/app/services/bug.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  bugs?: Bug[];

  constructor(private bugService: BugService) {}

  ngOnInit(): void {
    this.bugService.getAll().subscribe((result: Bug[]) => {
      console.log(result);
      this.bugs = result;
    });
  }

  deleteBug(bug: Bug): void {
    this.bugs = this.bugs?.filter((b) => b !== bug);
  }

  duplicateBug(bug: Bug): void {
    this.bugs?.push(bug);
  }

  createBug(bug: Bug): void {
    this.bugs?.push(bug);
  }

  drop(event: any): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      event.container.data.progress = event.previousContainer.data.progress;
      alert(event.container.data.progress);
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  get todoBugs(): Bug[] | undefined {
    return this.bugs?.filter((b) => b.progress === Progress.TODO);
  }

  get doingBugs(): Bug[] | undefined {
    return this.bugs?.filter((b) => b.progress === Progress.DOING);
  }

  get doneBugs(): Bug[] | undefined {
    return this.bugs?.filter((b) => b.progress === Progress.DONE);
  }
}

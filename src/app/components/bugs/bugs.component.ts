import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Bug, Progress } from 'src/app/models/bug.model';
import { BugService } from 'src/app/services/bug.service';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss'],
})
export class BugsComponent implements OnInit {
  todo?: Bug[];
  doing?: Bug[];
  done?: Bug[];

  filterForm: FormGroup;

  loaded = false;

  constructor(public formBuilder: FormBuilder, private bugService: BugService) {
    this.filterForm = this.formBuilder.group({
      name: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.bugService.getAll().subscribe((result: Bug[]) => {
      console.log(result);
      this.todo = result?.filter((b) => b.progress === Progress.TODO);
      this.doing = result?.filter((b) => b.progress === Progress.DOING);
      this.done = result?.filter((b) => b.progress === Progress.DONE);

      this.loaded = true;
    });
  }

  deleteBug(bug: Bug): void {
    this.bugService.delete(bug.id).subscribe(() => {
      switch (bug.progress) {
        case Progress.TODO:
          this.todo = this.todo?.filter((b) => b.id !== bug.id);
          break;
        case Progress.DOING:
          this.doing = this.doing?.filter((b) => b.id !== bug.id);
          break;
        case Progress.DONE:
          this.done = this.done?.filter((b) => b.id !== bug.id);
          break;
      }
    });
  }

  createBug(bug: Bug): void {
    this.bugService.create(bug).subscribe((created) => {
      switch (created.progress) {
        case Progress.TODO:
          this.todo?.push(created);
          break;
        case Progress.DOING:
          this.doing?.push(created);
          break;
        case Progress.DONE:
          this.done?.push(created);
          break;
      }
    });
  }

  updateBug(bug: Bug): void {
    this.bugService.update(bug).subscribe(() => {
      switch (bug.progress) {
        case Progress.TODO:
          this.todo = this.todo?.filter((b) => b.id !== bug.id);
          this.todo?.push(bug);
          break;
        case Progress.DOING:
          this.doing = this.doing?.filter((b) => b.id !== bug.id);
          this.doing?.push(bug);
          break;
        case Progress.DONE:
          this.done = this.done?.filter((b) => b.id !== bug.id);
          this.done?.push(bug);
          break;
      }
    });
  }

  drop(event: CdkDragDrop<any, any>, progress: number): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      const bug = event.container.data[event.currentIndex];
      this.bugService.update({ ...bug, progress }).subscribe();
    }
  }

  get nameFilter(): AbstractControl | null {
    return this.filterForm.get('name');
  }

  get todoBugs(): Bug[] | undefined {
    return this.todo?.filter((b) => b.title.toLowerCase().includes(this.nameFilter?.value) || b.description.toLowerCase().includes(this.nameFilter?.value));
  }

  get doingBugs(): Bug[] | undefined {
    return this.doing?.filter((b) => b.title.toLowerCase().includes(this.nameFilter?.value) || b.description.toLowerCase().includes(this.nameFilter?.value));
  }

  get doneBugs(): Bug[] | undefined {
    return this.done?.filter((b) => b.title.toLowerCase().includes(this.nameFilter?.value) || b.description.toLowerCase().includes(this.nameFilter?.value));
  }
}

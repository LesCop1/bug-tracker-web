import { Developer } from './developer.model';

export interface Bug {
  id?: number;
  title: string;
  description: string;
  creationDate: Date;
  priority: Priority;
  progress: Progress;
  author?: Developer;
  assignee?: Developer;
}

export enum Priority {
  LOW,
  MEDIUM,
  HIGH,
}

export enum Progress {
  TODO,
  DOING,
  DONE,
}

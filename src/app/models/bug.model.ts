import { Developer } from './developer.model';

export interface Bug {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  priority?: Priority;
  progress?: Progress;
  assignee?: Developer;
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum Progress {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}

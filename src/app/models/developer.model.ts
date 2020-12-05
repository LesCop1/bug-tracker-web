import { Bug } from './bug.model';

export interface Developer {
    id?: number;
    username: string;
    name: string;

    bugs?: Array<Bug>;
}

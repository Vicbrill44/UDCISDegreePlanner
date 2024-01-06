import { Course } from "./course";
export interface Semester {
    title: string;
    id: number;
    totalCredits: number;
    year: number;
    courses: Course[];
    term: string;
}

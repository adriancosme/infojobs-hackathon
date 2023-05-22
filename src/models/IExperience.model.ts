import { IExpertise } from './IExpertise.model';
export interface IExperience {
    id: number;
    company: string;
    job: string;
    description?: string;
    startingDate: Date;
    finishingDate?: Date;
    onCourse: boolean;
    industry?: string;
    level: string;
    staff?: string;
    subcategories: Array<string>;
    salaryMin?: string;
    salaryMax?: string;
    salaryPeriod?: string;
    hideSalary: boolean;
    visible: boolean;
    expertise: Array<IExpertise>;
}
import { User } from ".";

export interface Project {
    id?: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    users?: User[]
}

export interface ProjectCardsResponse {
    id: number
    name: string
    description: string
    startDate: string
    endDate: string
    task_quantity: number
}
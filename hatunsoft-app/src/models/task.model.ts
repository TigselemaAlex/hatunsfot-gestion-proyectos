export enum TaskState {
    PENDING = "pendiente",
    IN_PROGRESS = "en progreso",
    COMPLETE = "completada"
}

export interface Task {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    state: TaskState
    percentage: number;
}
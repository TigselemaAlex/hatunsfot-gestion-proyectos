import API from "../../../lib/API";
import { Task } from "../../../models";

const URL = "/protected/tasks"
export async function getTaskByProjectIdService(id: number) {
    const url = `${URL}/${id}`;
    const res = await API.get<Task[]>({ url })
    return res;
}
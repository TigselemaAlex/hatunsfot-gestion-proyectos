import API from "../../../lib/API";
import { Project } from "../../../models";
const URL = "/protected/projects";
export async function saveProjectService(project: Project, userId: number) {
    const url = `${URL}/${userId}`;
    const res = await API.post({ url, data: project })
    return res;
}
import API from "../../../lib/API";
import { ProjectCardsResponse } from "../../../models";
const URL = "/protected/projects"
export async function getProjectsService(userId: number) {
    const url = `${URL}/${userId}`;
    const res = await API.get<ProjectCardsResponse[]>({ url })
    return res
}
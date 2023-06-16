import API from "../../../lib/API";
import { Project } from "../../../models";

const URL = "/protected/projects/id/"
export async function getProjectByIdService(id: number) {
    const url = `${URL}/${id}`;
    const res = await API.get<Project>({ url })
    return res;
}
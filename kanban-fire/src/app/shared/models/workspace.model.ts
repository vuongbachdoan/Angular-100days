import { Task } from "./task.model";

export interface Workspace {
  editor?: string[],
  viewer?:string[],
  owner?: string,
  name: string,
  id?: string,
  data?: Task[]
}

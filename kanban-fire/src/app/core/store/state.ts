import { User } from "../services/user/user.model";

export interface AppState {
  currentWorkspaceId: string,
  currentUser: User
}

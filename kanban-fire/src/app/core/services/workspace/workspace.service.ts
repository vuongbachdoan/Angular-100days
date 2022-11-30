import { Injectable } from "@angular/core";

@Injectable()
export class WorkspaceService {
  constructor() {}

  setCurrentWorkspace(workspaceId: string) {
    localStorage.setItem('currentWorkspace', workspaceId)
  }
}

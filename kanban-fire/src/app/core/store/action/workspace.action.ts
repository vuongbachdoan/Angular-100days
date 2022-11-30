import { createAction, props } from "@ngrx/store";
import { Workspace } from "src/app/shared/models/workspace.model";

export const setCurrentWorkspace = createAction(
  '[WORKSPACE] SET CURRENT WORKSPACE',
  props<{currentWorkspaceId: string}>()
)

export const getCurrentWorkspace = createAction(
  '[WORKSPACE] GET CURRENT WORKSPACE',
)

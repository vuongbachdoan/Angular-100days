import { createReducer, on } from '@ngrx/store';
import { Workspace } from 'src/app/shared/models/workspace.model';
import { User } from '../../services/user/user.model';
import { getCurrentUser, setCurrentUser } from '../action/user.action';
import {
  getCurrentWorkspace,
  setCurrentWorkspace,
} from '../action/workspace.action';
import { AppState } from '../state';

const initialState : string = ''

export const workspaceReducer = createReducer(
  initialState,
  on(setCurrentWorkspace, (state, { currentWorkspaceId }) => currentWorkspaceId),
  on(getCurrentWorkspace, (state) => state)
);

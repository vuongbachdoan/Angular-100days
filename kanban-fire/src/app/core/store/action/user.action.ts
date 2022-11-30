import { createAction, props } from "@ngrx/store";
import { User } from "../../services/user/user.model";

export const setCurrentUser = createAction(
  '[USER] SET CURRENT USER',
  props<{currentUser: User}>()
)

export const getCurrentUser = createAction(
  '[USER] GET CURRENT USER',
)

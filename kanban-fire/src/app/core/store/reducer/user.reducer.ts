import { createReducer, on } from "@ngrx/store";
import { User } from "../../services/user/user.model";
import { getCurrentUser, setCurrentUser } from "../action/user.action";

const initialState: User = {} as User

export const userReducer = createReducer(
  initialState,
  on(
    setCurrentUser,
    (state, {currentUser}) => currentUser
  ),
  on(
    getCurrentUser,
    (state) => state
  )
)

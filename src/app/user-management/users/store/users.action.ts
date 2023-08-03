import { createAction, props } from '@ngrx/store';
import { Users } from './users';

export const invokeUsersAPI = createAction(
  '[Users API] Invoke Users Fetch API'
);

export const usersFetchAPISuccess = createAction(
  '[Users API] Fetch API Success',
  props<{ allUsers: Users[] }>()
);

export const invokeSaveNewUserAPI = createAction(
  '[Users API] Inovke save new user api',
  props<{ newUser: Users }>()
);

export const saveNewUserAPISucess = createAction(
  '[Users API] save new user api success',
  props<{ newUser: Users }>()
);

export const invokeUpdateUserAPI = createAction(
  '[Users API] Inovke update user api',
  props<{ updateUser: Users }>()
);

export const updateUserAPISucess = createAction(
  '[Users API] update  user api success',
  props<{ updateUser: Users }>()
);

export const invokeDeleteUserAPI = createAction(
  '[Users API] Inovke delete user api',
  props<{id:any}>()
);

export const deleteUserAPISuccess = createAction(
  '[Users API] deleted user api success',
  props<{id:any}>()
);
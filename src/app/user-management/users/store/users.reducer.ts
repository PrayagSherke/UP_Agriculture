import { createReducer, on } from '@ngrx/store';
import { Users } from './users';
import { usersFetchAPISuccess, deleteUserAPISuccess, saveNewUserAPISucess, updateUserAPISucess } from './users.action';

export const initialState: ReadonlyArray<Users> = [];

export const userReducer = createReducer(
  initialState,
  on(usersFetchAPISuccess, (state, { allUsers }) => {
    console.log(allUsers)
    return allUsers;
  }),
  on(saveNewUserAPISucess, (state, { newUser }) => {
    let newState = [...state];
    newState.unshift(newUser);
    return newState;
  }),
  on(updateUserAPISucess, (state, { updateUser }) => {
    let newState = state.filter((_) => _._id != updateUser._id);
    //newState.unshift(updateUser);
    console.log(newState)
    return newState;
  }),
  on(deleteUserAPISuccess, (state, { id }) => {
    let newState =state.filter((_) => _._id != id);
    return newState;
  })
);

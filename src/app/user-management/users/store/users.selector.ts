import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Users } from './users';

export const selectUsers = createFeatureSelector<Users[]>('myusers');

export const selectUserById = (userId: any) =>
  createSelector(selectUsers, (users: Users[]) => {
    var userbyId = users.filter((_) => _._id == userId);
    if (userbyId.length == 0) {
      return null;
    }
    return userbyId[0];
  });

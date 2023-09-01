import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Appstate, AuthState } from './appstate';
import { LoginState } from 'src/app/user-management/login/store/login.state';

export const AUTH_STATE_NAME = 'auth';

export const selectAppState = createFeatureSelector<Appstate>('appState');

export const selectLoginState = createFeatureSelector<LoginState>('LoginState');

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);


export const getErrorMessage = createSelector(selectAppState, state=>{
    console.log(state.apiResponseMessage)
    return state.apiResponseMessage
})


export const showLoadingSpinner = createSelector(selectAppState, state=>{
    return state.isLoading
})


export const isAuthenticated = createSelector(getAuthState, (state) => {
    return state.user ? true : false; //TODO
  });

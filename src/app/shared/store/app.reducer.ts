import { createReducer, on } from '@ngrx/store';
import { setAPIStatus, setErrorMessage } from './app.action';
import { Appstate } from './appstate';

export const initialState: Readonly<Appstate> = {
  apiResponseMessage: '',
  apiStatus: '',
  isLoading:false,
};

export const appReducer = createReducer(
  initialState,
  on(setAPIStatus, (state, { apiStatus }) => {
    return {
      ...state,
      ...apiStatus
    };
  }),
);

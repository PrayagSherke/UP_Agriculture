import { User } from "src/app/user-management/users/store/users";

export interface Appstate {
  apiStatus: string;
  // apiResponseMessage: string;
  isLoading:boolean;
}

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};

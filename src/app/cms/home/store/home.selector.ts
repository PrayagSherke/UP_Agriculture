import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HomeState } from "./home.state"

const getHomeState = createFeatureSelector<HomeState>('Home')

export const getToken = createSelector(getHomeState, state => {
    return state.token ? state.token : undefined
})
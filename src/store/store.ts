import { createStore } from "redux";
import { initialState } from "./initalState";
import CardReducers from "./reducers/CardReducers";

export const store = createStore(CardReducers, initialState)

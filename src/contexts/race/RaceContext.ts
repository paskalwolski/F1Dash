import { createContext } from "react";
import { initialState } from "./raceReducer";

export const ctx = createContext({ state: initialState, dispatch: null });

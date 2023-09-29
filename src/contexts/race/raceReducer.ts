import { RaceActions } from "./raceReducer.actions";

export const RaceReducer = (state, action) => {
  switch (action.type) {
    case RaceActions.SET_RACE:
      break;
    case RaceActions.SET_INFO_TAB:
      break;
    default:
      return state;
  }
};

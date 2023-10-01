import { RaceInformationTabs, RaceState } from "../context.types";
import { RaceActionTypes, RaceActions } from "./raceReducer.actions";

export const RaceReducer = (
  state: RaceState,
  action: RaceActionTypes
): RaceState => {
  switch (action.type) {
    case RaceActions.SET_RACE:
      {
        return {
          ...state,
          selectedRace: action.payload.race,
          raceInfoTab: action.payload.infoTab
            ? action.payload.infoTab
            : RaceInformationTabs.details,
        };
      }
      break;
    case RaceActions.SET_INFO_TAB: {
      return {
        ...state,
        raceInfoTab: action.payload,
      };
    }
    default:
      return state;
  }
};

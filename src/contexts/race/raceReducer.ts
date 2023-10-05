import { Race, RaceTable } from "../../global";
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
    case RaceActions.SET_SEASON_RACETABLE: {
      return {
        ...state,
        seasonRaceTable: action.payload,
        selectedRace: selectMostRecentRace(action.payload),
        raceInfoTab: RaceInformationTabs.details,
        raceTableLoading: false,
      };
    }
    case RaceActions.SET_RACETABLE_LOADING: {
      return {
        ...state,
        raceTableLoading: true,
      };
    }
    default:
      return state;
  }
};

const selectMostRecentRace = (raceTable: RaceTable): Race => {
  return raceTable.Races[1];
};

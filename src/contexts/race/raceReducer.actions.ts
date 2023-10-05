import { Race, RaceTable } from "../../global";
import { RaceInformationTabs } from "../context.types";

// export enum RaceActions {
//   SET_RACE = "set_race",
//   SET_INFO_TAB = "set_info_tab",
//   SET_SEASON_RACETABLE = "set_season_racetable",
//   SET_RACETABLE_LOADING = "set_racetable_loading",
//   SET_RACE_RESULT,
// }
export enum RaceActions {
  SET_RACE,
  SET_INFO_TAB,
  SET_SEASON_RACETABLE,
  SET_RACETABLE_LOADING,
}

type SetRaceType = {
  type: RaceActions.SET_RACE;
  payload: { race: Race; infoTab?: RaceInformationTabs };
};

type SetInfoTabType = {
  type: RaceActions.SET_INFO_TAB;
  payload: RaceInformationTabs;
};

type SetSeasonRacetableType = {
  type: RaceActions.SET_SEASON_RACETABLE;
  payload: RaceTable;
};

type SetRaceTableLoading = {
  type: RaceActions.SET_RACETABLE_LOADING;
  payload: boolean | null;
};

export type RaceActionTypes =
  | SetRaceType
  | SetInfoTabType
  | SetSeasonRacetableType
  | SetRaceTableLoading;

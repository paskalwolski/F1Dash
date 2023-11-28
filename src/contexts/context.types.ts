import { Dispatch } from "react";
import { RaceActionTypes } from "./race/raceReducer.actions.js";

export type RaceState = {
  seasonRaceTable?: RaceTable;
  raceTableLoading: boolean;
  selectedRace?: Race;
  raceInfoTab: keyof RaceDataTypes;
};

// export type RaceLoadingState = {
//   seasonLoading: boolean;
// } & RaceState;

export type RaceContextTypes = {
  state: RaceState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<RaceActionTypes>;
};

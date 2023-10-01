import { Dispatch } from "react";
import { Race, RaceTable } from "../global.js";
import { RaceActionTypes } from "./race/raceReducer.actions.js";

export type RaceState = {
  seasonRaceTable: RaceTable;
  selectedRace: Race;
  raceInfoTab: RaceInformationTabs;
};

export type RaceContextTypes = {
  state: RaceState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<RaceActionTypes>;
};

export const enum RaceInformationTabs {
  details = "Details",
  results = "Results",
  standings = "Standings",
}
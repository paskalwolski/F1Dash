import { Dispatch } from "react";
import { Race, RaceTable } from "../global.js";

export type RaceState = {
  seasonRaceTable: RaceTable;
  selectedRace: Race;
  raceInfoTab: RaceInformationTabs;
};

export type RaceContextTypes = {
  state?: RaceState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch?: Dispatch<any>;
};

export const enum RaceInformationTabs {
  details = "Details",
  results = "Results",
  standings = "Standings",
}

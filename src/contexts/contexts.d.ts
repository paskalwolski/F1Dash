import { Dispatch } from "react";
import { Race, RaceInformationTabs } from "../global.js";

export interface RaceState {
  selectedRace: Race;
  raceInfoTab: RaceInformationTabs;
}

export interface RaceContextTypes {
  state: RaceState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
}

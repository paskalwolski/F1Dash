import { useReducer } from "react";

import { RaceSelectionPanel } from "./RaceSelectionPanel";
import { Race, RaceInformationTabs, RaceTable } from "../../global";
import { RaceState } from "../../contexts/contexts";
import { RaceContext } from "../../contexts/ContextProvider";

import { RaceReducer } from "../../contexts/race/raceReducer";

interface PropTypes {
  seasonRaceTable: RaceTable;
}

export const RaceView = ({ seasonRaceTable }: PropTypes) => {
  // const [selectedRace, setSelectedRace] = useState<Race>();

  const initialRaceState: RaceState = {
    selectedRace: seasonRaceTable.Races[
      seasonRaceTable.Races.length - 1
    ] as Race,
    raceInfoTab: RaceInformationTabs.details,
  };
  const [raceState, dispatch] = useReducer(RaceReducer, initialRaceState);

  // setSelectedRace(
  //   seasonData?.["MRData"]?.["RaceTable"].Races[
  //     seasonData?.["MRData"]?.["RaceTable"].Races.length - 1
  //   ]
  // );

  return (
    <RaceContext.Provider value={{ state: raceState, dispatch: dispatch }}>
      <RaceSelectionPanel
        {...{ selectedRace, setSelectedRace, seasonRaceTable }}
      />
    </RaceContext.Provider>
  );
};

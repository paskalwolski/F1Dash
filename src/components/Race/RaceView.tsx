import { useReducer, useEffect } from "react";

import { RaceSelectionPanel } from "./RaceSelectionPanel";
import { RaceTable } from "../../global";
import { RaceInformationTabs, RaceState } from "../../contexts/context.types";
import { RaceContext } from "../../contexts/ContextProvider";

import { RaceReducer } from "../../contexts/race/raceReducer";
import { RaceActions } from "../../contexts/race/raceReducer.actions";

const RaceView = () => {
  // const [selectedRace, setSelectedRace] = useState<Race>();

  const initialRaceState: RaceState = {
    raceLoading: true,
    raceInfoTab: RaceInformationTabs.details,
    seasonRaceTable: null,
    selectedRace: null,
  };
  // const initialRaceState: RaceState = {
  //   seasonRaceTable: seasonRaceTable,
  //   selectedRace: seasonRaceTable.Races[
  //     seasonRaceTable.Races.length - 1
  //   ] as Race,
  //   raceInfoTab: RaceInformationTabs.details,
  // };
  const [raceState, dispatch] = useReducer(RaceReducer, initialRaceState);

  useEffect(() => {
    fetch("http://ergast.com/api/f1/current.json")
      .then((res) => res.json())
      .then((seasonData) => {
        console.log(seasonData);
        dispatch({
          type: RaceActions.SET_SEASON_RACETABLE,
          payload: seasonData?.["MRData"]?.["RaceTable"] as RaceTable,
        });
        // setSeasonRaceTable(seasonData?.["MRData"]?.["RaceTable"]);
      });
  }, []);

  // setSelectedRace(
  //   seasonData?.["MRData"]?.["RaceTable"].Races[
  //     seasonData?.["MRData"]?.["RaceTable"].Races.length - 1
  //   ]
  // );

  return (
    <RaceContext.Provider value={{ state: raceState, dispatch: dispatch }}>
      <RaceSelectionPanel />
    </RaceContext.Provider>
  );
};

export default RaceView;

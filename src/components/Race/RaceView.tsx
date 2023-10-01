import { useReducer, useEffect } from "react";

import { RaceSelectionPanel } from "./RaceSelectionPanel";
import { RaceTable } from "../../global";
import { RaceInformationTabs, RaceState } from "../../contexts/context.types";
import { RaceContext } from "../../contexts/ContextProvider";

import { RaceReducer } from "../../contexts/race/raceReducer";
import { RaceActions } from "../../contexts/race/raceReducer.actions";
import { Box } from "@mui/material";

const RaceView = () => {
  const initialRaceState: RaceState = {
    raceInfoTab: RaceInformationTabs.details,
  };

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
      });
  }, []);

  return (
    <Box height={"100%"}>
      <RaceContext.Provider value={{ state: raceState, dispatch: dispatch }}>
        <RaceSelectionPanel />
      </RaceContext.Provider>
    </Box>
  );
};

export default RaceView;

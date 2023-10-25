import { useReducer, useEffect } from "react";

import { RaceSelectionPanel } from "./RaceSelectionPanel";
import { RaceTable } from "../../types/global";
import { RaceInformationTabs, RaceState } from "../../contexts/context.types";
import { RaceContext } from "../../contexts/ContextProvider";

import { RaceReducer } from "../../contexts/race/raceReducer";
import { RaceActions } from "../../contexts/race/raceReducer.actions";
import { Box } from "@mui/material";

type Props = {
  seasonUrl?: string;
};

const RaceView = ({ seasonUrl }: Props) => {
  const initialRaceState: RaceState = {
    raceInfoTab: RaceInformationTabs.details,
    raceTableLoading: true,
  };

  const [raceState, dispatch] = useReducer(RaceReducer, initialRaceState);

  useEffect(() => {
    const targetUrl = seasonUrl
      ? seasonUrl
      : "http://ergast.com/api/f1/current.json";

    fetch(targetUrl)
      .then((res) => res.json())
      .then((seasonData) => {
        dispatch({
          type: RaceActions.SET_SEASON_RACETABLE,
          payload: seasonData?.["MRData"]?.["RaceTable"] as RaceTable,
        });
      });
  }, [seasonUrl]);

  return (
    <Box height={"100%"}>
      <RaceContext.Provider value={{ state: raceState, dispatch: dispatch }}>
        <RaceSelectionPanel />
      </RaceContext.Provider>
    </Box>
  );
};

export default RaceView;

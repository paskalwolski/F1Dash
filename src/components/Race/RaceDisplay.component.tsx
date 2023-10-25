import { useContext, useMemo, useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { RaceContext } from "../../contexts/ContextProvider";
import { RaceInformationTabs } from "../../contexts/context.types";
import { RaceActions } from "../../contexts/race/raceReducer.actions";
import { RaceDetails } from "./RaceDetails.component";
import { CarLoader } from "../CarLoader/CarLoader";

import { Race, Result } from "../../types/global";
import RaceResultsPanel from "./RaceResultsPanel.component";

type PropTypes = {
  race: Race;
};

export const RaceDisplay = ({ race }: PropTypes) => {
  // const [raceInfoDisplayFlag, setRaceInfoDisplayFlag] =
  //   useState<RaceInformation>(RaceInformation.details);
  const [results, setResults] = useState<Result[] | null>(null);
  // const [standings, setStandings] = useState<Standing[] | null>(null);
  const [loadingResults, setLoadingResults] = useState<boolean>(true);

  const raceCTX = useContext(RaceContext);

  const raceId = useMemo(() => {
    return race.season + "r" + race.round;
  }, [race.round, race.season]);

  useEffect(() => {
    const selectedSeason = race.season;
    const selectedRound = race.round;
    const url = `http://ergast.com/api/f1/${selectedSeason}/${selectedRound}/results.json`;
    fetch(url)
      .then((data) => data.json())
      .then((res) => {
        setResults(res.MRData.RaceTable.Races[0].Results);
        setLoadingResults(false);
      });
  }, [raceId]);

  return (
    <Box
      sx={{
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: 3,
        p: 2,
        pl: 4,
        borderColor: "primary.main",
      }}
    >
      <Typography variant="h3" sx={{ pb: 1 }}>
        {race.raceName}
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography variant="subtitle1" fontWeight={100} pr={1}>
          Round {race.round} |
        </Typography>
        <Typography variant="subtitle1">
          {race.Circuit.circuitName} on {race.date}
        </Typography>
      </div>
      <Box>
        <Tabs
          value={raceCTX?.state.raceInfoTab}
          onChange={(_, v: RaceInformationTabs) => {
            raceCTX?.dispatch({ type: RaceActions.SET_INFO_TAB, payload: v });
          }}
          sx={{ pl: 2 }}
        >
          <Tab
            label={RaceInformationTabs.details}
            value={RaceInformationTabs.details}
            key={RaceInformationTabs.details}
          />
          <Tab
            label={RaceInformationTabs.results}
            value={RaceInformationTabs.results}
            key={RaceInformationTabs.results}
          />
          <Tab
            label={RaceInformationTabs.standings}
            value={RaceInformationTabs.standings}
            key={RaceInformationTabs.standings}
          />
        </Tabs>
        <Box sx={{ padding: "8px" }}>
          {
            {
              [RaceInformationTabs.details]: <RaceDetails {...{ race }} />,
              [RaceInformationTabs.results]: loadingResults ? (
                <CarLoader />
              ) : (
                results && (
                  <RaceResultsPanel
                    {...{
                      results,
                      resultId: "s" + race.season + "r" + race.round,
                    }}
                  />
                )
              ),
              [RaceInformationTabs.standings]: <>Season goes here!</>,
            }[raceCTX?.state.raceInfoTab ?? RaceInformationTabs.details]
          }
        </Box>
      </Box>
    </Box>
  );
};

import { useContext, useEffect, useMemo, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { RaceContext } from "../../contexts/ContextProvider";
import { RaceInformationTabs } from "../../contexts/context.types";
import { RaceActions } from "../../contexts/race/raceReducer.actions";
import { RaceDetails } from "./RaceDetails.component";
import { CarLoader } from "../CarLoader/CarLoader";

import { Race, RaceDataTypes, RaceResult } from "../../types/global";
import RaceResultsPanel from "./RaceResultsPanel.component";

type PropTypes = {
  race: Race;
};

export const RaceDisplay = ({ race }: PropTypes) => {
  const [raceData, setRaceData] = useState<RaceDataTypes>({ Details: race });
  const [loadingData, setLoadingData] = useState<boolean>(true);

  const raceCTX = useContext(RaceContext);

  const raceId = useMemo(() => {
    return race.season + "r" + race.round;
  }, [race.round, race.season]);

  // useEffect(() => {
  //   const selectedSeason = race.season;
  //   const selectedRound = race.round;
  //   const url = `http://ergast.com/api/f1/${selectedSeason}/${selectedRound}/results.json`;
  //   fetch(url)
  //     .then((data) => data.json())
  //     .then((res) => {
  //       setRaceData({ Details: res.MRData.RaceTable.Races[0].Results as Race });
  //       setLoadingData(false);
  //     });
  // }, [raceId]);

  const getRaceData = <T,>(key: keyof RaceDataTypes) => {
    if (key in raceData) {
      console.log("Using stored data...");
      return raceData[key] as T;
    } else {
      console.log("Fetching new data...");
      setLoadingData(true);
      fetch(`http://ergast.com/api/f1/${race.season}/${race.round}/${key}.json`)
        .then((res) => res.json())
        .then((data) => {
          let results;
          switch (key) {
            case "DriverStandings":
              results = data.MRData.StandingsLists[0].DriverStandings as T;
              break;
            case "ConstructorStandings":
              results = data.MRData.StandingsLists[0].ConstructorStandings as T;
              break;
          }
          setRaceData({ ...data, [key]: results });
          setLoadingData(false);
          return results;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Box
      sx={{
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: 3,
        p: 2,
        pl: 4,
        borderColor: "primary.main",
        height: "100%",
        overflow: "scroll",
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
          {loadingData ? (
            <CarLoader />
          ) : (
            {
              [RaceInformationTabs.details]: raceData.Details ? (
                <RaceDetails {...{ race: raceData.Details }} />
              ) : (
                <>No Race Details Present</>
              ),
              [RaceInformationTabs.results]: (
                <RaceResultsPanel
                  {...{
                    results: getRaceData<RaceResult[]>("Results"),
                    resultId: "s" + race.season + "r" + race.round,
                  }}
                />
              ),
              [RaceInformationTabs.standings]: <>Season goes here!</>,
            }[raceCTX?.state.raceInfoTab ?? RaceInformationTabs.details]
            // { ["Details"]: <RaceDetails race={race} /> }[
            //   raceCTX?.state.raceInfoTab
            // ]
          )}
        </Box>
      </Box>
    </Box>
  );
};

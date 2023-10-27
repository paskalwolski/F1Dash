import { useContext, useEffect, useMemo, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { RaceContext } from "../../contexts/ContextProvider";
import { RaceActions } from "../../contexts/race/raceReducer.actions";
import { RaceDetails } from "./RaceDetails.component";
import { CarLoader } from "../CarLoader/CarLoader";

import {
  ConstructorStanding,
  DriverStanding,
  QualifyingResult,
  Race,
  RaceDataTypes,
  RaceResult,
} from "../../types/global";
import RaceResultsPanel from "./RaceResultsPanel.component";

type PropTypes = {
  race: Race;
};

export const RaceDisplay = ({ race }: PropTypes) => {
  const [raceData, setRaceData] = useState<RaceDataTypes>({ Details: race });
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const raceCTX = useContext(RaceContext);

  const raceId = useMemo(() => {
    return race.season + "r" + race.round;
  }, [race.round, race.season]);

  const availableRaceData: (keyof RaceDataTypes)[] = useMemo(() => {
    const values: (keyof RaceDataTypes)[] = [
      "Details",
      "Results",
      "Qualifying",
      "ConstructorStandings",
      "DriverStandings",
    ];
    if (race.Sprint) {
      values.push("Sprint");
    }
    return values;
  }, [raceId]);

  useEffect(() => {
    if (raceCTX?.state.raceInfoTab) {
      getRaceData(raceCTX?.state?.raceInfoTab);
    }
  }, [raceCTX?.state.raceInfoTab]);

  // useEffect(() => {
  //   console.log(raceData);
  // }, [raceData]);

  const getRaceData = (key: keyof RaceDataTypes) => {
    if (key in raceData) {
      // console.log("Key Already Fetched");
      setLoadingData(false);
    } else {
      // console.log("Fetching new data...");
      setLoadingData(true);
      fetch(`http://ergast.com/api/f1/${race.season}/${race.round}/${key}.json`)
        .then((res) => res.json())
        .then((data) => {
          let results;
          switch (key) {
            case "DriverStandings":
              results = data.MRData.StandingsTable.StandingsLists[0]
                .DriverStandings as DriverStanding[];
              break;
            case "ConstructorStandings":
              results = data.MRData.StandingsTable.StandingsLists[0]
                .ConstructorStandings as ConstructorStanding[];
              break;
            case "Qualifying":
              results = data.MRData.RaceTable.Races[0]
                .QualifyingResult as QualifyingResult[];
              break;
            case "Results":
              results = data.MRData.RaceTable.Races[0].Results as RaceResult[];
              break;
          }
          setRaceData({ ...raceData, [key]: results });
          setLoadingData(false);
        })
        .catch((e) => {
          console.error(e);
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
          onChange={(_, v: keyof RaceDataTypes) => {
            raceCTX?.dispatch({ type: RaceActions.SET_INFO_TAB, payload: v });
          }}
          sx={{ pl: 2 }}
        >
          {availableRaceData.map((data) => {
            return <Tab label={data} value={data} key={data} />;
          })}
        </Tabs>
        <Box sx={{ padding: "8px" }}>
          {loadingData ? (
            <CarLoader />
          ) : (
            {
              ["Details"]: raceData.Details ? (
                <RaceDetails {...{ race: raceData.Details }} />
              ) : (
                <>No Race Details Present</>
              ),
              ["Results"]: (
                // <>No Race Results Present</>
                <RaceResultsPanel
                  {...{
                    results: raceData.Results,
                    resultId: "s" + race.season + "r" + race.round,
                  }}
                />
              ),
              ["ConstructorStandings"]: <>CStandings goes here!</>,
              ["Qualifying"]: <>Quali Goes here</>,
              ["Sprint"]: <>Sprint Goes Here</>,
              ["DriverStandings"]: <>Driver Goes here</>,
            }[raceCTX?.state.raceInfoTab ?? "Details"]
            // { ["Details"]: <RaceDetails race={race} /> }[
            //   raceCTX?.state.raceInfoTab
            // ]
          )}
        </Box>
      </Box>
    </Box>
  );
};

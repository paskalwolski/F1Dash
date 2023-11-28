import { useContext, useEffect, useMemo, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { RaceContext } from "../../contexts/ContextProvider";
import { RaceActions } from "../../contexts/race/raceReducer.actions";
import { RaceDetails } from "./RaceDetails/RaceDetails.component";
import { CarLoader } from "../CarLoader/CarLoader";

import {
  ConstructorStanding,
  DriverStanding,
  QualifyingResult,
  Race,
  RaceDataTypes,
  RaceResult,
} from "../../types/global";
import RaceResultsPanel from "./RaceDetails/RaceResultsPanel.component";
import { ConstructorStandingsPanel } from "./RaceDetails/ConstructorStandingsPanel.component";
import { QualiResultsPanel } from "./RaceDetails/QualiResultsPanel.component";
import { SprintResultsPanel } from "./RaceDetails/SprintResultsPanel.component";
import { DriverStandingsPanel } from "./RaceDetails/DriverStandingsPanel.component";

type PropTypes = {
  race: Race;
  raceId: string;
};

export const RaceDisplay = ({ raceId, race }: PropTypes) => {
  // Can I extract this to a hook -> usePartialData?
  const [raceData, setRaceData] = useState<RaceDataTypes>({ Details: race });
  const [loadingData, setLoadingData] = useState<boolean>(true);

  const raceCTX = useContext(RaceContext);

  // useEffect(() => {
  //   setLoadingData(true);
  //   setRaceData({});
  // }, [raceId]);

  // useEffect(() => {
  //   console.log(race);
  // }, [race]);

  const availableRaceData: (keyof RaceDataTypes)[] = useMemo(() => {
    const values: (keyof RaceDataTypes)[] = ["Details", "Results"];
    "Qualifying" in race && values.push("Qualifying");
    "Sprint" in race && values.push("Sprint");
    values.push("DriverStandings", "ConstructorStandings");
    return values;
  }, [raceId]);

  useEffect(() => {
    if (raceCTX?.state.raceInfoTab) {
      getRaceData(raceCTX?.state?.raceInfoTab);
    }
  }, [raceCTX?.state.raceInfoTab, raceId]);

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
              console.log(data.MRData);
              results = data.MRData.RaceTable.Races[0]
                .QualifyingResults as QualifyingResult[];
              console.log(results);
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

  const sessionMap = {
    DriverStandings: "Driver Standings",
    ConstructorStandings: "Constructor Standings",
    Qualifying: "Qualifying",
    Results: "Results",
    Details: "Details",
    Sprint: "Sprint",
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
            return <Tab label={sessionMap[data]} value={data} key={data} />;
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
              ["Results"]: raceData.Results ? (
                // <>No Race Results Present</>
                <RaceResultsPanel
                  {...{
                    results: raceData.Results,
                    resultId: raceId + "r" + race.round,
                  }}
                />
              ) : (
                <>There was a problem fetching the Race Results</>
              ),
              ["ConstructorStandings"]: raceData.ConstructorStandings ? (
                <ConstructorStandingsPanel
                  {...{
                    results: raceData.ConstructorStandings,
                    resultId: raceId + "cs",
                  }}
                />
              ) : (
                <>There was a problem with the Constructor Data</>
              ),
              ["Qualifying"]: raceData.Qualifying ? (
                <QualiResultsPanel
                  {...{ results: raceData.Qualifying, resultId: raceId + "q" }}
                />
              ) : (
                <>There was a problem with the Qualifying Data</>
              ),
              ["Sprint"]: raceData.Sprint ? (
                <SprintResultsPanel
                  {...{ results: raceData.Sprint, resultId: raceId + "sp" }}
                />
              ) : (
                <>There was a problem with the Sprint Data</>
              ),
              ["DriverStandings"]: raceData.DriverStandings ? (
                <DriverStandingsPanel
                  {...{
                    results: raceData.DriverStandings,
                    resultId: raceId + "ds",
                  }}
                />
              ) : (
                <>There was a problem with the Driver Standings</>
              ),
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

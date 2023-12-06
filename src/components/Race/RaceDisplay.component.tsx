import { useContext, useEffect, useMemo, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { RaceContext } from "../../contexts/ContextProvider";
import { RaceActions } from "../../contexts/race/raceReducer.actions";
import { RaceDetails } from "./RaceDetails/RaceDetails.component";
import { CarLoader } from "../CarLoader/CarLoader";

import {
  ConstructorStandingTableData,
  DriverStandingTableData,
  QualiResultTableData,
  RaceResultTableData,
  SprintResultTableData,
} from "../../types/TableData";

import TableContainer from "../TableDisplay/TableContainer.component";

type PropTypes = {
  race: Race;
  raceId: string;
};

export const RaceDisplay = ({ raceId, race }: PropTypes) => {
  // Can I extract this to a hook -> usePartialData?
  const [raceData, setRaceData] = useState<RaceDataTypes>({ Details: race });
  const [loadingData, setLoadingData] = useState<boolean>(true);

  const raceCTX = useContext(RaceContext);

  const availableRaceData: (keyof RaceDataTypes)[] = useMemo(() => {
    const values: (keyof RaceDataTypes)[] = ["Details", "Results"];
    "Qualifying" in race && values.push("Qualifying");
    "Sprint" in race && values.push("Sprint");
    values.push("DriverStandings", "ConstructorStandings");
    return values;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raceId]);

  useEffect(() => {
    if (raceCTX?.state.raceInfoTab) {
      getRaceData(raceCTX?.state?.raceInfoTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raceCTX?.state.raceInfoTab, raceId]);

  const getRaceData = (key: keyof RaceDataTypes) => {
    if (key in raceData) {
      setLoadingData(false);
    } else {
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
                .QualifyingResults as QualifyingResult[];
              break;
            case "Results":
              results = data.MRData.RaceTable.Races[0].Results as RaceResult[];
              break;
          }
          setRaceData({ ...raceData, [key]: results });
          // setLoadingData(false);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  useEffect(() => {
    setLoadingData(false);
  }, [raceData]);

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
        pb: 1,
        borderColor: "primary.main",
        height: "100%",
        overflowY: "scroll",
        overflowX: "hidden",
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
                <TableContainer<RaceResultTableData>
                  {...{
                    data: raceData.Results,
                    resultId: raceId + "r" + race.round,
                    dataType: "Results",
                  }}
                />
              ) : (
                <>There was a problem fetching the Race Results</>
              ),
              ["ConstructorStandings"]: raceData.ConstructorStandings ? (
                <TableContainer<ConstructorStandingTableData>
                  {...{
                    data: raceData.ConstructorStandings,
                    resultId: raceId + "cs",
                    dataType: "ConstructorStandings",
                  }}
                />
              ) : (
                <>There was a problem with the Constructor Data</>
              ),
              ["Qualifying"]: raceData.Qualifying ? (
                <TableContainer<QualiResultTableData>
                  {...{
                    data: raceData.Qualifying,
                    resultId: raceId + "q",
                    dataType: "Qualifying",
                  }}
                />
              ) : (
                <>There was a problem with the Qualifying Data</>
              ),
              ["Sprint"]: raceData.Sprint ? (
                <TableContainer<SprintResultTableData>
                  {...{
                    data: raceData.Sprint,
                    resultId: raceId + "sp",
                    dataType: "Sprint",
                  }}
                />
              ) : (
                <>There was a problem with the Sprint Data</>
              ),
              ["DriverStandings"]: raceData.DriverStandings ? (
                <TableContainer<DriverStandingTableData>
                  {...{
                    data: raceData.DriverStandings,
                    resultId: raceId + "ds",
                    dataType: "DriverStandings",
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

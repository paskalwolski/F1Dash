import { useEffect, useState } from "react";

import { RaceSelectionPanel } from "./RaceSelectionPanel";
import { Race, RaceTable } from "../../global";
export const RaceView = () => {
  const [seasonRaceTable, setSeasonRaceTable] = useState<RaceTable>({
    season: "",
    Races: [],
  });
  const [selectedRace, setSelectedRace] = useState<Race>();
  const [selectedTab, setSelectedTab] = useState("Race");

  useEffect(() => {
    fetch("http://ergast.com/api/f1/current.json")
      .then((res) => res.json())
      .then((seasonData) => {
        setSeasonRaceTable(seasonData?.["MRData"]?.["RaceTable"]);
        setSelectedRace(
          seasonData?.["MRData"]?.["RaceTable"].Races[
            seasonData?.["MRData"]?.["RaceTable"].Races.length - 1
          ]
        );
      });
  }, []);

  useEffect(() => {}, [selectedTab]);

  useEffect(() => {
    console.log(seasonRaceTable);
  }, [seasonRaceTable]);

  return (
    // <Grid container>
    //   <Grid
    //     item
    //     xs={12}
    //     sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    //   >
    //     <Typography variant="h4">{seasonRaceTable.season}</Typography>
    //   </Grid>
    //   {selectedRace && (
    //     <Grid item xs={12} sm={9} lg={10}>
    //       <RaceDisplay {...{ race: selectedRace }} />
    //     </Grid>
    //   )}
    //   <Grid item xs={12} sm={3} lg={2}>
    //     <RaceSelectionPanel
    //       {...{ seasonRaceTable, selectedRace, setSelectedRace }}
    //     />
    //   </Grid>
    // </Grid>
    <RaceSelectionPanel
      {...{ selectedRace, setSelectedRace, seasonRaceTable }}
    />
  );
};

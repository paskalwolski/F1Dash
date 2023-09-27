import { useEffect, useState } from "react";

import { RaceSelectionPanel } from "./RaceSelectionPanel";
import { Race, RaceTable } from "../../global";
import { Box } from "@mui/material";
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

  return (
    <Box>
      <RaceSelectionPanel
        {...{ selectedRace, setSelectedRace, seasonRaceTable }}
      />
    </Box>
  );
};

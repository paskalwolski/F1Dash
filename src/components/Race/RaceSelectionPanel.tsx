// import { Typography } from "@mui/material";
import React, { useState } from "react";
import { Race, RaceTable } from "../../global";
import { Grid, Box } from "@mui/material";
import { RaceCard } from "./RaceCard/RaceCard.component";
import { RaceDisplay } from "./RaceDisplay.component";

interface props {
  seasonRaceTable: RaceTable;
  selectedRace: Race | undefined;
  setSelectedRace: React.Dispatch<React.SetStateAction<Race | undefined>>;
}

enum selectedPanel {
  race = "race",
  display = "display",
  season = "season",
}

export const RaceSelectionPanel = ({
  seasonRaceTable,
  selectedRace,
  setSelectedRace,
}: props) => {
  const [selectedTab, setSelectedTab] = useState(selectedPanel.display);
  // SelectRace, SelectSeason, ViewRace ?

  return (
    <Grid
      container
      sx={{
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        margin: 2,
      }}
      // style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid
        md={selectedTab == selectedPanel.display ? 10 : 2}
        onClick={() => setSelectedTab(selectedPanel.display)}
        item
      >
        {selectedRace ? (
          <RaceDisplay {...{ race: selectedRace }} />
        ) : (
          <div>Please select a race</div>
        )}
      </Grid>
      <Grid md={selectedTab == selectedPanel.race ? 10 : 2} item>
        <div
          style={{ height: "100vh", overflowX: "hidden", overflowY: "auto" }}
        >
          {seasonRaceTable.Races.map((race, i) => (
            <RaceCard
              onClick={() => {
                setSelectedTab(selectedPanel.race);
              }}
              key={"raceCard" + i}
              {...{ race, selectRace: setSelectedRace }}
            />
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

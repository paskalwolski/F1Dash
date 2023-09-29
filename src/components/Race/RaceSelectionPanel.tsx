// import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { Race, RaceTable } from "../../global";
import { Grid } from "@mui/material";
import { RaceCard } from "./RaceCard.component";
import { RaceDisplay } from "./RaceDisplay.component";
import { RaceContext } from "../../contexts/ContextProvider";
import { RaceContextTypes } from "../../contexts/contexts";

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
  const raceContext: RaceContextTypes | null = useContext(RaceContext);

  return (
    raceContext && (
      <Grid container spacing="8px" padding="8px">
        <Grid md={10} xs={12} item>
          {selectedRace ? (
            <RaceDisplay {...{ race: selectedRace }} />
          ) : (
            <div>Please select a race</div>
          )}
        </Grid>
        <Grid
          md={2}
          container
          item
          spacing={1}
          overflow={"scroll"}
          maxHeight={"90vh"}
        >
          {seasonRaceTable.Races.map((race, i) => (
            <Grid item width={"100%"} key={i}>
              <RaceCard
                actionAreaClick={() => {
                  setSelectedTab(selectedPanel.race);
                }}
                key={i}
                {...{ race, selectRace: setSelectedRace }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    )
  );
};

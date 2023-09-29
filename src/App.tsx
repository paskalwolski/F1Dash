import { useState, useEffect } from "react";

//MUI Components
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar } from "@mui/material";
import { Bolt } from "@mui/icons-material";

//Custom Components
import { RaceView } from "./components/Race/RaceView";

// Types
import { RaceTable } from "./global";

function App() {
  const [seasonRaceTable, setSeasonRaceTable] = useState<RaceTable>({
    season: "",
    Races: [],
  });

  useEffect(() => {
    fetch("http://ergast.com/api/f1/current.json")
      .then((res) => res.json())
      .then((seasonData) => {
        setSeasonRaceTable(seasonData?.["MRData"]?.["RaceTable"]);
      });
  }, []);

  return (
    <>
      <main style={{ backgroundColor: "secondary.main" }}>
        <AppBar position="sticky">
          <Toolbar>
            <Bolt />
            <Typography variant="h6">F1 Dash</Typography>
          </Toolbar>
        </AppBar>
        <section>
          {seasonRaceTable.season && <RaceView {...{ seasonRaceTable }} />}
          {/* <SeasonPanel /> */}
        </section>
      </main>
    </>
  );
}

export default App;

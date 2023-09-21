import "./App.css";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar } from "@mui/material";
import { Bolt } from "@mui/icons-material";

import { RaceView } from "./components/Race/RaceView";

function App() {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Bolt />
          <Typography variant="h6">F1 Dash</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <section>
          <RaceView />
          {/* <SeasonPanel /> */}
        </section>
      </main>
    </>
  );
}

export default App;

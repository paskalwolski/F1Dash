import Typography from "@mui/material/Typography";
import { AppBar, Toolbar } from "@mui/material";
import { Bolt } from "@mui/icons-material";

import { RaceView } from "./components/Race/RaceView";

function App() {
  return (
    <>
      <main>
        <AppBar position="sticky">
          <Toolbar>
            <Bolt />
            <Typography variant="h6">F1 Dash</Typography>
          </Toolbar>
        </AppBar>
        <section>
          <RaceView />
          {/* <SeasonPanel /> */}
        </section>
      </main>
    </>
  );
}

export default App;

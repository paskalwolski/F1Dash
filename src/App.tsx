import { Suspense, lazy } from "react";

//MUI Components
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar } from "@mui/material";
import { Bolt } from "@mui/icons-material";

// Types
import { CarLoader } from "./components/CarLoader/CarLoader";

function App() {
  const RaceView = lazy(() => import("./components/Race/RaceView"));

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
          <Suspense fallback={<CarLoader />}>
            <RaceView />
          </Suspense>
          {/* <SeasonPanel /> */}
        </section>
      </main>
    </>
  );
}

export default App;

// import { Suspense, lazy } from "react";

//MUI Components
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar } from "@mui/material";
import { Bolt } from "@mui/icons-material";

//Custom Components
// import { CarLoader } from "./components/CarLoader/CarLoader";
import RaceView from "./components/Race/RaceView";

function App() {
  // const RaceView = lazy(() => import("./components/Race/RaceView"));

  return (
    <>
      <main
        style={{
          backgroundColor: "secondary.main",
          height: "100vh",
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar position={"static"}>
          <Toolbar>
            <Bolt />
            <Typography variant="h6">F1 Dash</Typography>
          </Toolbar>
        </AppBar>
        <section style={{ height: "calc(100vh - 64px)" }}>
          {/* <Suspense fallback={<CarLoader />}> */}
          <RaceView />
          {/* </Suspense> */}
          {/* <SeasonPanel /> */}
        </section>
      </main>
    </>
  );
}

export default App;

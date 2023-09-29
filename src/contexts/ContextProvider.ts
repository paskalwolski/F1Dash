import { createContext } from "react";
import { RaceContextTypes } from "./contexts";

export const RaceContext = createContext<RaceContextTypes | null>(null);

import { createContext } from "react";
import { RaceContextTypes } from "./context.types";

export const RaceContext = createContext<RaceContextTypes | null>(null);

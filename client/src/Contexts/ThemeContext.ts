import { createContext } from "react";
import { createTheme, Theme } from "@mui/material";

export const ThemeContext = createContext<[Theme, (theme: Theme) => void]>([createTheme(), () => {}]);

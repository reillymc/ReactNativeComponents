import React from "react";

import { ThemeContext } from "../providers";

export const useTheme = () => React.useContext(ThemeContext);

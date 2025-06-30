import { use } from "react";

import { ThemeContext } from "../providers";

export const useTheme = () => use(ThemeContext);

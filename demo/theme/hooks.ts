import { useTheme as useBaseTheme } from "@reillymc/react-native-components/hooks";

import type { AppStyles } from "./styles";

export const useTheme = () => useBaseTheme<AppStyles>();

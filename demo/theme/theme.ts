import type { Theme } from "@reillymc/react-native-components/theme";

import type { AppTheme } from "./types";

export const createAppTheme = ({ spacing }: Theme): AppTheme => ({
    spacing: {
        pageHorizontal: spacing.medium,
        pageTop: spacing.medium,
        pageBottom: 80,
        navigationActionHorizontal: 0,
    },
});

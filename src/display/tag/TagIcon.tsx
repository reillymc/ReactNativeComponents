import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { IconBase } from "../../icons/IconBase";
import type { IconComponentProps } from "../../icons/IconComponentProps";
import { useComponent } from "../../internal";

export interface TagIconTheme {
    size: number;
    color: ColorValue;
}

export const TagIcon = <G extends string>({
    theme: themeOverrides,
    ...iconProps
}: IconComponentProps<G> & { theme?: DeepPartial<TagIconTheme> }) => {
    const { theme } = useComponent("tagIcon", { themeOverrides });

    return <IconBase {...iconProps} color={theme.color} size={theme.size} />;
};

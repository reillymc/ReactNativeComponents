import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { IconBase } from "../../icons/IconBase";
import type { IconComponentProps } from "../../icons/IconComponentProps";
import { useComponent } from "../../internal";
import type { TagTone } from "./Tag";

export interface TagIconTheme {
    size: number;
    color: Record<TagTone, ColorValue>;
}

export const TagIcon = <G extends string>({
    tone = "dark",
    theme: themeOverrides,
    ...iconProps
}: IconComponentProps<G> & {
    tone?: TagTone;
    theme?: DeepPartial<TagIconTheme>;
}) => {
    const { theme } = useComponent("tagIcon", { themeOverrides });

    return (
        <IconBase {...iconProps} color={theme.color[tone]} size={theme.size} />
    );
};

import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { IconBase } from "../../icons/IconBase";
import type { IconComponentProps } from "../../icons/IconComponentProps";
import { defineStyles, type PropFilter, useComponent } from "../../internal";
import { Text } from "../../typography/text";
import { ActionBase, type ActionBaseProps } from "./ActionBase";
import { StateTint } from "./StateTint";

export type IconActionBaseTheme = {
    gap: number;
    color: ColorValue;
};

export interface IconActionBaseProps
    extends Pick<
        ActionBaseProps,
        | "onPress"
        | "disabled"
        | "highlighted"
        | "style"
        | "tabIndex"
        | "hitSlop"
        | "accessibilityLabel"
        | "onFocus"
        | "onBlur"
    > {
    label?: string;
    iconPosition?: "start" | "end";
    iconSize?: number;
    theme?: DeepPartial<IconActionBaseTheme>;
}

export const IconActionBase = <G extends string>({
    label,
    iconPosition = "start",
    iconSize,
    theme: themeOverrides,
    iconName,
    iconSet,
    ...actionProps
}: IconActionBaseProps & IconComponentProps<G>) => {
    const { styles, theme } = useComponent("iconActionBase", {
        themeOverrides,
        props: { iconPosition },
        createStyles,
    });

    return (
        <ActionBase {...actionProps}>
            {(state) => (
                <StateTint {...state} style={styles.container}>
                    <IconBase
                        iconSet={iconSet}
                        iconName={iconName}
                        size={iconSize}
                        color={theme.color}
                    />
                    {!!label && (
                        <Text numberOfLines={1} theme={{ color: theme.color }}>
                            {label}
                        </Text>
                    )}
                </StateTint>
            )}
        </ActionBase>
    );
};

const createStyles = defineStyles(
    (
        theme: IconActionBaseTheme,
        props: PropFilter<IconActionBaseProps, "iconPosition">,
    ) => ({
        container: {
            display: "flex",
            flexDirection:
                props.iconPosition === "start" ? "row" : "row-reverse",
            alignItems: "center",
            gap: theme.gap,
        },
    }),
);

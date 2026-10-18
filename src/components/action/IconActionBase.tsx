import { type ColorValue, StyleSheet } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { IconBase, type IconComponentProps } from "../icon";
import { Text } from "../text";
import type { ActionBaseProps } from "./ActionBase";
import { ActionBase } from "./ActionBase";
import { StateTint } from "./StateTint";

export type IconActionBaseStyles = {
    gap: number;
    color: ColorValue;
};

export interface IconActionBaseProps
    extends Pick<ActionBaseProps, "onPress" | "disabled" | "containerStyle"> {
    label?: string;
    iconPosition?: "start" | "end";
    style?: DeepPartial<IconActionBaseStyles>;
}

export const IconActionBase = <G extends string>({
    label,
    iconPosition = "start",
    disabled: disabledProp,
    containerStyle,
    style: styleOverrides,
    onPress,
    ...iconProps
}: IconActionBaseProps & IconComponentProps<G>) => {
    const disabled = disabledProp || !onPress;

    const [styles, { style }] = useThemedStyles(
        "iconActionBase",
        createStyles,
        {
            styles: { iconActionBase: styleOverrides },
            props: { iconPosition },
        },
    );

    return (
        <ActionBase
            disabled={disabled}
            onPress={onPress}
            containerStyle={containerStyle}
        >
            {(state) => (
                <StateTint {...state} style={styles.container}>
                    <IconBase {...iconProps} color={style.color} />
                    {!!label && (
                        <Text numberOfLines={1} style={{ color: style.color }}>
                            {label}
                        </Text>
                    )}
                </StateTint>
            )}
        </ActionBase>
    );
};

const createStyles = (
    { styles: { iconActionBase } }: ThemedStyles,
    {
        iconPosition = "start",
    }: Required<Pick<IconActionBaseProps, "iconPosition">>,
) =>
    StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: iconPosition === "start" ? "row" : "row-reverse",
            alignItems: "center",
            gap: iconActionBase.gap,
        },
    });

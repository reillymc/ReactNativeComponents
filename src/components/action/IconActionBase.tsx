import { StyleSheet, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import {
    InteractiveIcon,
    type InteractiveIconProps,
    type InteractiveIconStyles,
} from "../icon";
import { InteractiveText, type InteractiveTextStyles } from "../text";
import type { ActionProps } from "./Action";
import { ActionBase } from "./ActionBase";

export type IconActionBaseStyles = {
    gap: number;
    text: {
        color: InteractiveTextStyles["color"];
    };
    icon: {
        color: InteractiveIconStyles["color"];
    };
};

export interface IconActionBaseProps<G extends string, Fn extends string>
    extends Pick<ActionProps, "onPress" | "disabled" | "containerStyle">,
        Pick<InteractiveIconProps<G, Fn>, "iconSet" | "iconName"> {
    label?: string;
    iconPosition?: "left" | "right";
    style?: DeepPartial<IconActionBaseStyles>;
}

export const IconActionBase = <G extends string, Fn extends string>({
    iconName,
    label,
    iconPosition = "left",
    disabled: disabledProp,
    containerStyle,
    style,
    iconSet,
    onPress,
}: IconActionBaseProps<G, Fn>) => {
    const disabled = disabledProp || !onPress;

    const [styles, { iconActionBase }] = useThemedStylesWithOverride(
        createStyles,
        { iconActionBase: style },
        { iconPosition },
    );

    return (
        <ActionBase
            disabled={disabled}
            containerStyle={containerStyle}
            onPress={onPress}
        >
            {(pressableState) => (
                <View style={styles.container}>
                    <InteractiveIcon
                        iconSet={iconSet}
                        iconName={iconName}
                        disabled={disabled}
                        style={iconActionBase.icon}
                        {...pressableState}
                    />
                    {!!label && (
                        <InteractiveText
                            disabled={disabled}
                            style={iconActionBase.text}
                            {...pressableState}
                        >
                            {label}
                        </InteractiveText>
                    )}
                </View>
            )}
        </ActionBase>
    );
};

IconActionBase.displayName = "IconActionBase";

const createStyles = (
    { styles: { iconActionBase } }: ThemedStyles,
    {
        iconPosition = "right",
    }: Required<Pick<IconActionBaseProps<"", "">, "iconPosition">>,
) =>
    StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: iconPosition === "left" ? "row" : "row-reverse",
            alignItems: "center",
            gap: iconActionBase.gap,
        },
    });

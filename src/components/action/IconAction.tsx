import { type ColorValue, StyleSheet, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import { InteractiveIcon, type InteractiveIconProps } from "../icon";
import { InteractiveText } from "../text";
import type { InteractiveTextState } from "../text/InteractiveText";
import type { ActionProps, ActionVariant } from "./Action";
import { ActionBase } from "./ActionBase";

export type IconActionStyles = {
    gap: number;
    color: {
        [Variant in ActionVariant]: {
            [State in InteractiveTextState]: ColorValue;
        };
    };
};

export interface IconActionProps<G extends string, Fn extends string>
    extends Pick<
            ActionProps,
            "onPress" | "disabled" | "containerStyle" | "variant"
        >,
        Pick<InteractiveIconProps<G, Fn>, "iconSet" | "iconName"> {
    label?: string;
    iconPosition?: "left" | "right";
    style?: DeepPartial<IconActionStyles>;
}

export const IconAction = <G extends string, Fn extends string>({
    iconName,
    label,
    variant = "secondary",
    iconPosition = "left",
    disabled: disabledProp,
    containerStyle,
    style,
    iconSet,
    onPress,
}: IconActionProps<G, Fn>) => {
    const disabled = disabledProp || !onPress;

    const [styles, { iconAction }] = useThemedStylesWithOverride(
        createStyles,
        { iconAction: style },
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
                        style={{ color: iconAction.color[variant] }}
                        {...pressableState}
                    />
                    {!!label && (
                        <InteractiveText
                            disabled={disabled}
                            variant={variant}
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

IconAction.displayName = "IconAction";

const createStyles = (
    { styles: { iconAction } }: ThemedStyles,
    {
        iconPosition = "right",
    }: Required<Pick<IconActionProps<"", "">, "iconPosition">>,
) =>
    StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: iconPosition === "left" ? "row" : "row-reverse",
            alignItems: "center",
            gap: iconAction.gap,
        },
    });

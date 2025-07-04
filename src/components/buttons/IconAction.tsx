import { StyleSheet, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import type { ActionProps } from "./Action";
import { ActionBase } from "./ActionBase";
import { InteractiveIcon, type InteractiveIconProps } from "./InteractiveIcon";
import { InteractiveText } from "./InteractiveText";

export type IconActionStyles = {
    gap: number;
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

    const [styles] = useThemedStylesWithOverride(
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
                        variant={variant}
                        {...pressableState}
                    />
                    {!!label && (
                        <InteractiveText
                            label={label}
                            disabled={disabled}
                            variant={variant}
                            {...pressableState}
                        />
                    )}
                </View>
            )}
        </ActionBase>
    );
};

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

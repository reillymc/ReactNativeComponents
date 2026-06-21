import { StyleSheet, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import type { ComponentIconAssets } from "../../theme";
import { ActionBase } from "../action";
import {
    componentWithIcon,
    InteractiveIcon,
    type InteractiveIconStyles,
} from "../icon";
import { Text } from "../text";
import type { InputBaseProps, InputVariant } from "./InputBase";
import type { InputScaffoldProps } from "./InputScaffold";

type ToggleVariant = "primary" | "secondary";

export type ToggleInputIcons = ComponentIconAssets<"outline">;

export type ToggleInputStyles = {
    indicator: {
        size: { [Size in InputVariant]: number };
        color: {
            deselected: InteractiveIconStyles["color"];
            selected: Record<ToggleVariant, InteractiveIconStyles["color"]>;
        };
    };
    label: {
        gap: number;
    };
};

export interface ToggleInputProps
    extends Pick<InputScaffoldProps, "helpText" | "label" | "containerStyle">,
        Pick<InputBaseProps, "variant" | "disabled"> {
    value?: boolean;
    toggleVariant?: ToggleVariant;
    styles?: DeepPartial<ToggleInputStyles>;
    onChange: (value: boolean) => void;
}

export const ToggleInput = componentWithIcon<ToggleInputProps>(
    ({
        label,
        helpText,
        value = false,
        toggleVariant = "primary",
        containerStyle,
        variant = "regular",
        disabled: disabledProp,
        styles: styleOverrides,
        onChange,
        ...iconProps
    }) => {
        const disabled = disabledProp || !onChange;

        const [styles, { style: toggleInput, icons }] = useThemedStyles(
            "toggleInput",
            createStyles,
            { styles: { toggleInput: styleOverrides }, props: { variant } },
        );

        return (
            <ActionBase
                disabled={disabled}
                containerStyle={[styles.container, containerStyle]}
                onPress={() => onChange(!value)}
            >
                {(pressableState) => (
                    <>
                        <View style={styles.labelIconContainer}>
                            <View style={styles.iconContainer}>
                                <InteractiveIcon
                                    iconName={icons.outline}
                                    style={{
                                        size: toggleInput.indicator.size[
                                            variant
                                        ],
                                        color: value
                                            ? toggleInput.indicator.color
                                                  .selected[toggleVariant]
                                            : toggleInput.indicator.color
                                                  .deselected,
                                    }}
                                    disabled={disabled}
                                    {...pressableState}
                                />
                                <View style={styles.icon}>
                                    {!!value && (
                                        <InteractiveIcon
                                            {...iconProps}
                                            style={{
                                                size: toggleInput.indicator
                                                    .size[variant],
                                                color: toggleInput.indicator
                                                    .color.selected[
                                                    toggleVariant
                                                ],
                                            }}
                                            disabled={disabled}
                                            {...pressableState}
                                        />
                                    )}
                                </View>
                            </View>
                            {label && (
                                <Text variant="label" disabled={disabled}>
                                    {label}
                                </Text>
                            )}
                        </View>
                        {helpText && (
                            <View style={styles.helpText}>
                                {typeof helpText === "string" ? (
                                    <Text variant="caption">{helpText}</Text>
                                ) : (
                                    helpText
                                )}
                            </View>
                        )}
                    </>
                )}
            </ActionBase>
        );
    },
);

const createStyles = (
    { styles: { toggleInput, inputScaffold } }: ThemedStyles,
    { variant }: Required<Pick<ToggleInputProps, "variant">>,
) => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
        },
        labelIconContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: toggleInput.label.gap,
        },
        iconContainer: {
            width: toggleInput.indicator.size[variant],
            height: toggleInput.indicator.size[variant],
        },
        icon: {
            position: "absolute",
            alignSelf: "center",
        },
        helpText: {
            marginLeft:
                toggleInput.indicator.size[variant] + toggleInput.label.gap,
            marginTop: inputScaffold.gap,
        },
    });
    return styles;
};

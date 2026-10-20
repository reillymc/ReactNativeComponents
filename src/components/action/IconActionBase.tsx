import { StyleSheet, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { type IconComponentProps, InteractiveIcon } from "../icon";
import { InteractiveText } from "../text";
import type { ActionProps } from "./Action";
import { ActionBase } from "./ActionBase";
import type { IconActionBaseStyles } from "./IconActionBase.styles";

export interface IconActionBaseProps
    extends Pick<ActionProps, "onPress" | "disabled" | "containerStyle"> {
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
            containerStyle={containerStyle}
            onPress={onPress}
        >
            {(pressableState) => (
                <View style={styles.container}>
                    <InteractiveIcon
                        disabled={disabled}
                        style={style.icon}
                        {...iconProps}
                        {...pressableState}
                    />
                    {!!label && (
                        <InteractiveText
                            disabled={disabled}
                            style={style.text}
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

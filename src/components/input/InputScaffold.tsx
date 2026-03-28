import type { FC, ReactNode } from "react";
import {
    type ColorValue,
    type StyleProp,
    StyleSheet,
    View,
    type ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { IconBase } from "../icon";
import { Text } from "../text";

export interface InputScaffoldStyles {
    gap: number;
    mandatoryIndicator: {
        color: ColorValue;
    };
    helpText: {
        gap: number;
    };
}

export interface InputScaffoldProps {
    /**
     * Supports
     *
     * - `<Text />`
     * - string
     */
    label?: ReactNode;

    helpText?: string;
    hasError?: boolean;
    mandatory?: boolean;

    containerStyle?: StyleProp<ViewStyle>;

    children: ReactNode;
}

export const InputScaffold: FC<InputScaffoldProps> = ({
    label,
    helpText,
    mandatory,
    children,
    containerStyle,
    hasError,
}) => {
    const styles = useThemedStyles(createStyles, {});

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <View style={styles.labelContainer}>
                    {typeof label === "string" ? (
                        <Text variant="label">{label}</Text>
                    ) : (
                        label
                    )}
                </View>
            )}
            <View>
                {children}
                {mandatory && (
                    <Text variant="title" style={styles.mandatoryIndicator}>
                        {"\u2022"}
                    </Text>
                )}
            </View>
            {(helpText || hasError) && (
                <View style={styles.helpText}>
                    {hasError && (
                        <IconBase
                            iconSet={AntDesign}
                            iconName="exclamation-circle"
                            style={{ color: "red", size: 16 }} // TODO extract to new styled component - help and/or error text?
                        />
                    )}
                    {helpText &&
                        (typeof helpText === "string" ? (
                            <Text variant="caption">{helpText}</Text>
                        ) : (
                            helpText
                        ))}
                </View>
            )}
        </View>
    );
};

const createStyles = ({ styles: { inputBase, inputScaffold } }: ThemedStyles) =>
    StyleSheet.create({
        container: {
            flex: 1,
            gap: inputScaffold.gap,
        },
        labelContainer: {
            marginLeft: inputBase.container.padding,
        },
        mandatoryIndicator: {
            position: "absolute",
            color: inputScaffold.mandatoryIndicator.color,
            left: inputBase.container.padding,
        },
        helpText: {
            flexDirection: "row",
            gap: inputScaffold.gap,
            marginLeft: inputBase.container.padding,
            alignItems: "center",
        },
    });

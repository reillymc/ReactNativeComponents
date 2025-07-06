import type { FC, ReactNode } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { Icon } from "../icon";
import { Text } from "../text";

export interface InputScaffoldStyles {
    height: number;
    borderRadius: number;
    padding: number;
    fontSize: number;
    fontFamilyWeight: string;
    textColor: string;
    placeholderTextColor: string;
    disabledTextColor: string;
    backgroundColor: string;
    backgroundColorDisabled: string;
    labelMargin: number;
    mandatoryColor: string;
    errorColor: string;
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

    /**
     * Prevents auto trimming of text. (Can interfere with inputs that handle onChangeText)
     */

    panelAboveElement?: ReactNode;
    panelBelowElement?: ReactNode;

    containerStyle?: StyleProp<ViewStyle>;

    children: ReactNode;
}

export const InputScaffold: FC<InputScaffoldProps> = ({
    label,
    helpText,
    mandatory,
    children,
    panelAboveElement,
    panelBelowElement,
    containerStyle,
    hasError,
}) => {
    const styles = useThemedStyles(createStyles, {});

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={{ flexGrow: 1 }}>
                {label && (
                    <View style={styles.labelContainer}>
                        {typeof label === "string" ? (
                            <Text variant="label">{label}</Text>
                        ) : (
                            label
                        )}
                    </View>
                )}
                {panelAboveElement}
                <View>
                    {children}
                    {mandatory && (
                        <Text variant="title" style={styles.mandatoryIndicator}>
                            {"\u2022"}
                        </Text>
                    )}
                </View>
                {panelBelowElement}
                {(helpText || hasError) && (
                    <View style={styles.helpText}>
                        {hasError && (
                            <Icon
                                iconSet={AntDesign}
                                size="small"
                                iconName="exclamationcircle"
                                style={styles.errorIndicator}
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
        </View>
    );
};

const createStyles = ({
    styles: { baseInput },
    theme: { spacing },
}: ThemedStyles) =>
    StyleSheet.create({
        container: {
            flexDirection: "row",
            flexGrow: 1,
            flexBasis: 1,
        },
        labelContainer: {
            marginBottom: baseInput.labelMargin,
            marginLeft: baseInput.padding,
        },
        mandatoryIndicator: {
            position: "absolute",
            color: baseInput.mandatoryColor,
            top: 0,
            left: spacing.small,
        },
        helpText: {
            flexDirection: "row",
            gap: spacing.tiny,
            marginTop: baseInput.labelMargin,
            marginLeft: baseInput.padding,
            alignItems: "center",
        },
        errorIndicator: {
            color: baseInput.errorColor,
        },
    });

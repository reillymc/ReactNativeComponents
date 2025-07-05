import type { FC, ReactNode, Ref } from "react";
import {
    type DimensionValue,
    type StyleProp,
    StyleSheet,
    TextInput,
    type TextInputProps,
    View,
    type ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { type ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { Icon } from "../icon";
import { Text } from "../text";
import type { InputWidth } from "./types";

export interface BaseInputStyles {
    height: number;
    width: {
        [key in InputWidth]: DimensionValue;
    };
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

export interface BaseInputProps extends Omit<TextInputProps, "editable"> {
    /**
     * Supports
     *
     * - `<Text />`
     * - string
     */
    label?: ReactNode;

    width?: InputWidth;
    disabled?: boolean;

    helpText?: string;
    hasError?: boolean;
    mandatory?: boolean;

    /**
     * Prevents auto trimming of text. (Can interfere with inputs that handle onChangeText)
     */
    preventAutoTrim?: boolean;

    /**
     * Input element component.
     */
    inputElement?: ReactNode;
    panelAboveElement?: ReactNode;
    panelBelowElement?: ReactNode;
    modalElement?: ReactNode;

    containerStyle?: StyleProp<ViewStyle>;

    ref?: Ref<TextInput | null>;
}

export const BaseInput: FC<BaseInputProps> = ({
    label,
    width,
    disabled,
    helpText,
    mandatory,
    inputElement,
    panelAboveElement,
    panelBelowElement,
    modalElement,
    style,
    containerStyle,
    multiline,
    scrollEnabled,
    hasError,
    preventAutoTrim,
    onChangeText,
    ref,
    ...props
}) => {
    const styles = useThemedStyles(createStyles, {
        width,
        disabled,
        multiline,
    });
    const {
        styles: { baseInput },
    } = useTheme();

    return (
        <>
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
                {panelAboveElement && <View>{panelAboveElement}</View>}

                <View>
                    {inputElement ? (
                        inputElement
                    ) : (
                        <TextInput
                            ref={ref}
                            editable={!disabled}
                            placeholderTextColor={
                                baseInput.placeholderTextColor
                            }
                            style={[styles.input, style]}
                            multiline={multiline}
                            scrollEnabled={scrollEnabled ?? false}
                            onChangeText={onChangeText}
                            {...props}
                        />
                    )}
                    {mandatory && (
                        <Text variant="title" style={styles.mandatoryIndicator}>
                            {"\u2022"}
                        </Text>
                    )}
                    {panelBelowElement && <View>{panelBelowElement}</View>}
                </View>
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
            {modalElement}
        </>
    );
};

const createStyles = (
    { styles: { baseInput }, theme: { spacing } }: ThemedStyles,
    { width, disabled, multiline = false }: BaseInputProps,
) =>
    StyleSheet.create({
        container: {
            display: "flex",
            width: width ? baseInput.width[width] : undefined,
            flex: width ? undefined : 1,
        },
        labelContainer: {
            marginBottom: baseInput.labelMargin,
            marginLeft: baseInput.padding, // Try out??
        },
        mandatoryIndicator: {
            position: "absolute",
            color: baseInput.mandatoryColor,
            top: -7,
            left: 7,
        },
        input: {
            height: multiline ? "auto" : baseInput.height,
            borderRadius: baseInput.borderRadius,
            backgroundColor: disabled
                ? baseInput.backgroundColorDisabled
                : baseInput.backgroundColor,
            padding: baseInput.padding,
            fontSize: baseInput.fontSize,
            fontFamily: baseInput.fontFamilyWeight,
            color: baseInput.textColor,
        },
        helpText: {
            flexDirection: "row",
            gap: spacing.tiny,
            marginTop: baseInput.labelMargin,
        },
        errorIndicator: {
            color: baseInput.errorColor,
        },
    });

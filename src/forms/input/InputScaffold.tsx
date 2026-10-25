import type { FC, ReactNode } from "react";
import {
    type ColorValue,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";

import type { ComponentIconAssets } from "../../icons/componentIconAssets";
import { Icon } from "../../icons/Icon";
import { defineStyles, useComponent } from "../../internal";
import { Text } from "../../typography/text";

export interface InputScaffoldTheme {
    gap: number;
    inputPadding: number;
    errorColor: ColorValue;
    mandatoryIndicator: {
        color: ColorValue;
    };
    helpText: {
        gap: number;
    };
}

export type InputScaffoldIcons = ComponentIconAssets<"error">;

/**
 * Standard set of scaffold props accepted by every input field, forwarded
 * straight through to `InputScaffold`.
 */
export type InputScaffoldFieldProps = {
    /**
     * Supports
     *
     * - `<Text />`
     * - string
     */
    label?: ReactNode;
    helpText?: string;
    mandatory?: boolean;
    hasError?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
};

export interface InputScaffoldProps extends InputScaffoldFieldProps {
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
    const { styles, theme, icons } = useComponent("inputScaffold", {
        createStyles,
    });

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
                        <Icon
                            {...icons.error}
                            theme={{ color: theme.errorColor }}
                            size="small"
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

const createStyles = defineStyles((theme: InputScaffoldTheme) => ({
    container: {
        alignSelf: "stretch",
        minWidth: 0,
        gap: theme.gap,
    },
    labelContainer: {
        marginStart: theme.inputPadding,
    },
    mandatoryIndicator: {
        position: "absolute",
        color: theme.mandatoryIndicator.color,
        start: theme.inputPadding,
    },
    helpText: {
        flexDirection: "row",
        gap: theme.helpText.gap,
        marginStart: theme.inputPadding,
        alignItems: "center",
    },
}));

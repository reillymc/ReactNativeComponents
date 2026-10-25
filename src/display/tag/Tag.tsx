import type { FC, ReactElement } from "react";
import {
    type ColorValue,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { ActionBase } from "../../actions/action";
import { defineStyles, type PropFilter, useComponent } from "../../internal";
import { Text } from "../../typography/text";

export type TagVariant = "light" | "dark";

export interface TagTheme {
    internalSpacing: number;
    borderRadius: number;
    padding: number;
    backgroundColor: Record<TagVariant, ColorValue>;
    textColor: ColorValue;
}

export interface TagProps {
    label?: string;
    /**
     * [TagIcon](./TagIcon.tsx)
     */
    icon?: ReactElement;
    variant?: TagVariant;
    style?: StyleProp<ViewStyle>;
    theme?: DeepPartial<TagTheme>;
    onPress?: () => void;
}

export const Tag: FC<TagProps> = ({
    label,
    onPress,
    icon,
    variant = "dark",
    style,
    theme: themeOverrides,
}) => {
    const { styles } = useComponent("tag", {
        themeOverrides,
        props: { variant },
        createStyles,
    });

    const content = (
        <>
            {icon}
            <Text style={styles.text}>{label}</Text>
        </>
    );

    const containerStyle = [styles.container, style];

    return onPress ? (
        <ActionBase onPress={onPress} style={containerStyle}>
            {content}
        </ActionBase>
    ) : (
        <View style={containerStyle}>{content}</View>
    );
};

const createStyles = defineStyles(
    (theme: TagTheme, props: PropFilter<TagProps, "variant">) => ({
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: theme.borderRadius,
            padding: theme.padding,
            backgroundColor: theme.backgroundColor[props.variant],
            width: "auto",
            gap: theme.internalSpacing,
        },
        text: {
            color: theme.textColor,
        },
    }),
);

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
import { TextBase } from "../../typography/text";

export type TagTone = "light" | "dark";

export interface TagTheme {
    internalSpacing: number;
    borderRadius: number;
    padding: number;
    backgroundColor: Record<TagTone, ColorValue>;
    textColor: Record<TagTone, ColorValue>;
}

export interface TagProps {
    label?: string;
    /**
     * [TagIcon](./TagIcon.tsx)
     */
    icon?: ReactElement;
    tone?: TagTone;
    style?: StyleProp<ViewStyle>;
    theme?: DeepPartial<TagTheme>;
    onPress?: () => void;
}

export const Tag: FC<TagProps> = ({
    label,
    onPress,
    icon,
    tone = "dark",
    style,
    theme: themeOverrides,
}) => {
    const { styles, theme } = useComponent("tag", {
        themeOverrides,
        props: { tone },
        createStyles,
    });

    const content = (
        <>
            {icon}
            <TextBase theme={{ color: theme.textColor[tone] }}>
                {label}
            </TextBase>
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
    (theme: TagTheme, props: PropFilter<TagProps, "tone">) => ({
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: theme.borderRadius,
            padding: theme.padding,
            backgroundColor: theme.backgroundColor[props.tone],
            width: "auto",
            gap: theme.internalSpacing,
        },
    }),
);

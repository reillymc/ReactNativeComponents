import { Children, type FC, Fragment, type ReactNode } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, useComponent } from "../../internal";
import { TextBase } from "../../typography/text";

export type ContentRowTheme = {
    gap: number;
};

export interface ContentRowProps {
    children?: ReactNode;
    separator?: ReactNode;
    style?: StyleProp<ViewStyle>;
    theme?: DeepPartial<ContentRowTheme>;
}

const DEFAULT_SEPARATOR = <TextBase>·</TextBase>;

export const ContentRow: FC<ContentRowProps> = ({
    children,
    separator = DEFAULT_SEPARATOR,
    style,
    theme: themeOverrides,
}) => {
    const { styles } = useComponent("contentRow", {
        themeOverrides,
        createStyles,
    });

    const items = Children.toArray(children);

    return (
        <View style={[styles.row, style]}>
            {items.map((item, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: index is the only available key
                <Fragment key={index}>
                    <View style={styles.item}>{item}</View>
                    {index < items.length - 1 && separator}
                </Fragment>
            ))}
        </View>
    );
};

const createStyles = defineStyles((theme: ContentRowTheme) => ({
    row: {
        flexDirection: "row",
        gap: theme.gap,
    },
    item: {
        flexDirection: "row",
        flexShrink: 1,
    },
}));

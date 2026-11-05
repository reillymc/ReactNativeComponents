import type { FC } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import { InteractionSurface } from "../../actions/surface";
import { defineStyles, useComponent } from "../../internal";
import {
    HighlightedText,
    type HighlightedTextTheme,
} from "../../typography/text";

export type MenuItemTheme = {
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
    lineHeight: {
        label: number;
        description: number;
    };
    label: HighlightedTextTheme;
    description: HighlightedTextTheme;
};

export interface MenuItemProps {
    label: string;
    description?: string;
    searchValue?: string;
    highlighted?: boolean;
    /** Truncate label and description to a single line with a tail ellipsis. */
    truncate?: boolean;
    height?: number;
    onPress: () => void;
    theme?: DeepPartial<MenuItemTheme>;
}

export const MenuItem: FC<MenuItemProps> = ({
    label,
    description,
    searchValue,
    highlighted,
    truncate,
    height,
    onPress,
    theme: themeOverrides,
}) => {
    const { styles, theme } = useComponent("menuItem", {
        themeOverrides,
        props: { height },
        createStyles,
    });

    return (
        <InteractionSurface
            hitSlop={0}
            highlighted={highlighted}
            onPress={onPress}
            style={styles.menuItem}
        >
            <HighlightedText
                text={label}
                highlight={searchValue}
                numberOfLines={truncate ? 1 : undefined}
                ellipsizeMode={truncate ? "tail" : undefined}
                style={{ lineHeight: theme.lineHeight.label }}
                theme={theme.label}
            />
            {!!description && (
                <HighlightedText
                    variant="caption"
                    text={description}
                    highlight={searchValue}
                    numberOfLines={truncate ? 1 : undefined}
                    ellipsizeMode={truncate ? "tail" : undefined}
                    style={{
                        lineHeight: theme.lineHeight.description,
                    }}
                    theme={theme.description}
                />
            )}
        </InteractionSurface>
    );
};

MenuItem.displayName = "MenuItem";

const createStyles = defineStyles(
    (theme: MenuItemTheme, props: Pick<MenuItemProps, "height">) => ({
        menuItem: {
            alignSelf: "stretch",
            minWidth: 0,
            paddingHorizontal: theme.paddingHorizontal,
            paddingVertical: theme.paddingVertical,
            borderRadius: theme.borderRadius,
            height: props.height,
        },
    }),
);

import { type ColorValue, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import {
    InteractionSurface,
    type InteractionSurfaceProps,
} from "../../actions/surface";
import { IconBase } from "../../icons/IconBase";
import type { IconComponentProps } from "../../icons/IconComponentProps";
import { defineStyles, useComponent } from "../../internal";
import {
    HighlightedText,
    type HighlightedTextTheme,
} from "../../typography/text";

export type MenuItemTheme = {
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
    gap: number;
    lineHeight: {
        label: number;
        description: number;
    };
    label: HighlightedTextTheme;
    description: HighlightedTextTheme;
    icon: {
        size: number;
        color: ColorValue;
    };
};

export interface MenuItemProps {
    label: string;
    description?: string;
    searchValue?: string;
    highlighted?: InteractionSurfaceProps["highlighted"];
    disabled?: InteractionSurfaceProps["disabled"];
    accessibilityLabel?: string;
    role?: InteractionSurfaceProps["role"];
    tabIndex?: InteractionSurfaceProps["tabIndex"];
    /** Truncate label and description to a single line with a tail ellipsis. */
    truncate?: boolean;
    height?: number;
    iconSize?: number;
    onPress: InteractionSurfaceProps["onPress"];
    theme?: DeepPartial<MenuItemTheme>;
}

export const MenuItem = <G extends string>({
    label,
    description,
    searchValue,
    truncate,
    height,
    iconSize,
    iconSet,
    iconName,
    theme: themeOverrides,
    ...interactionSurfaceProps
}: MenuItemProps & Partial<IconComponentProps<G>>) => {
    const { styles, theme } = useComponent("menuItem", {
        themeOverrides,
        props: { height },
        createStyles,
    });

    return (
        <InteractionSurface
            {...interactionSurfaceProps}
            hitSlop={0}
            style={styles.menuItem}
        >
            {!!iconSet && !!iconName && (
                <IconBase
                    iconSet={iconSet}
                    iconName={iconName}
                    size={iconSize ?? theme.icon.size}
                    color={theme.icon.color}
                />
            )}
            <View style={styles.textContainer}>
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
            </View>
        </InteractionSurface>
    );
};

MenuItem.displayName = "MenuItem";

const createStyles = defineStyles(
    (theme: MenuItemTheme, props: Pick<MenuItemProps, "height">) => ({
        menuItem: {
            alignSelf: "stretch",
            minWidth: 0,
            flexDirection: "row",
            alignItems: "center",
            gap: theme.gap,
            paddingHorizontal: theme.paddingHorizontal,
            paddingVertical: theme.paddingVertical,
            borderRadius: theme.borderRadius,
            height: props.height,
        },
        textContainer: {
            flexShrink: 1,
            flexGrow: 1,
            minWidth: 0,
            flexDirection: "column",
            alignItems: "flex-start",
        },
    }),
);

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
    label: HighlightedTextTheme;
    description: HighlightedTextTheme;
};

export interface MenuItemProps {
    label: string;
    description?: string;
    searchValue?: string;
    highlighted?: boolean;
    onPress: () => void;
    theme?: DeepPartial<MenuItemTheme>;
}

export const MenuItem: FC<MenuItemProps> = ({
    label,
    description,
    searchValue,
    highlighted,
    onPress,
    theme: themeOverrides,
}) => {
    const { styles, theme } = useComponent("menuItem", {
        themeOverrides,
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
                theme={theme.label}
            />
            {!!description && (
                <HighlightedText
                    variant="caption"
                    text={description}
                    highlight={searchValue}
                    theme={theme.description}
                />
            )}
        </InteractionSurface>
    );
};

MenuItem.displayName = "MenuItem";

const createStyles = defineStyles((theme: MenuItemTheme) => ({
    menuItem: {
        paddingHorizontal: theme.paddingHorizontal,
        paddingVertical: theme.paddingVertical,
        borderRadius: theme.borderRadius,
    },
}));

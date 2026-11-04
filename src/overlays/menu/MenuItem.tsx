import type { FC } from "react";
import type { ColorValue } from "react-native";

import { InteractionSurface } from "../../actions/surface";
import { defineStyles, useComponent } from "../../internal";
import { HighlightedText } from "../../typography/text";

export type MenuItemTheme = {
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
    textColor: ColorValue;
};

export interface MenuItemProps {
    label: string;
    description?: string;
    searchValue?: string;
    highlighted?: boolean;
    onPress: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({
    label,
    description,
    searchValue,
    highlighted,
    onPress,
}) => {
    const { styles, theme } = useComponent("menuItem", { createStyles });

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
                theme={{ color: theme.textColor }}
            />
            {!!description && (
                <HighlightedText
                    variant="caption"
                    text={description}
                    highlight={searchValue}
                    theme={{ color: theme.textColor }}
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

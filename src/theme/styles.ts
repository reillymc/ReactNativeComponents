import type { DeepPartial } from "@reillymc/es-utils";
import merge from "lodash.merge";

import type {
    ActionStyles,
    AlertIndicatorStyles,
    AvatarStyles,
    ButtonBaseStyles,
    ButtonStyles,
    DropdownInputStyles,
    FloatingContainerStyles,
    HighlightedTextStyles,
    IconActionBaseStyles,
    IconActionStyles,
    IconBaseStyles,
    IconButtonBaseStyles,
    IconButtonStyles,
    IconStyles,
    InputActionStyles,
    InputBaseStyles,
    InputScaffoldStyles,
    InteractiveIconStyles,
    InteractiveTextStyles,
    ListItemStyles,
    MenuItemStyles,
    MenuStyles,
    RatingStyles,
    SelectionInputStyles,
    SwipeActionStyles,
    TextStyles,
    ToastStyles,
    ToggleInputStyles,
} from "../components";
import type { Theme } from "./theme";

export type Styles = {
    text: TextStyles;
    interactiveText: InteractiveTextStyles;
    highlightedText: HighlightedTextStyles;

    icon: IconStyles;
    iconBase: IconBaseStyles;
    interactiveIcon: InteractiveIconStyles;

    action: ActionStyles;
    iconAction: IconActionStyles;
    iconActionBase: IconActionBaseStyles;

    buttonBase: ButtonBaseStyles;
    button: ButtonStyles;
    iconButtonBase: IconButtonBaseStyles;
    iconButton: IconButtonStyles;

    inputBase: InputBaseStyles;
    inputScaffold: InputScaffoldStyles;
    inputAction: InputActionStyles;
    toggleInput: ToggleInputStyles;
    selectionInput: SelectionInputStyles;

    rating: RatingStyles;
    alertIndicator: AlertIndicatorStyles;

    dropdownInput: DropdownInputStyles;
    listItem: ListItemStyles;
    avatar: AvatarStyles;
    common: {
        action: {
            fontSize: {
                [Size in "small" | "regular" | "large"]: number;
            };
        };
    };
    toast: ToastStyles;
    menu: MenuStyles;
    menuItem: MenuItemStyles;
    swipeAction: SwipeActionStyles;
    floatingContainer: FloatingContainerStyles;
};

export type StyleOverrides = DeepPartial<Styles>;

export type CreateStyles = (theme: Theme) => Styles;

export const createDefaultStyles: CreateStyles = ({
    border,
    color,
    font,
    spacing,
}) => {
    const interactiveText: InteractiveTextStyles = {
        color: {
            enabled: color.primary,
            pressed: color.primaryLight,
            disabled: color.primaryLight,
        },
    };

    const highlightedText: HighlightedTextStyles = {
        highlightedWeight: {
            body: "800",
            caption: "800",
            display: "800",
            heading: "800",
            label: "800",
            title: "800",
        },
    };

    const iconBase: IconBaseStyles = {
        color: color.textPrimary,
        size: 20,
    };

    const icon: IconStyles = {
        color: color.textPrimary,
        size: {
            small: 16,
            medium: iconBase.size,
            large: 24,
        },
    };

    const interactiveIcon: InteractiveIconStyles = {
        size: iconBase.size,
        color: {
            enabled: color.primary,
            pressed: color.primaryLight,
            disabled: color.primaryLight,
        },
    };

    const action: ActionStyles = {
        label: {
            color: {
                primary: {
                    enabled: color.primary,
                    pressed: color.primaryLight,
                    disabled: color.primaryLight,
                },
                secondary: {
                    enabled: color.secondary,
                    pressed: color.secondaryHighlight,
                    disabled: color.secondaryHighlight,
                },
                destructive: {
                    enabled: color.destructive,
                    pressed: color.destructiveHighlight,
                    disabled: color.destructiveHighlight,
                },
            },
        },
    };

    const iconActionBase: IconActionBaseStyles = {
        gap: spacing.small,
        icon: interactiveText,
        text: interactiveText,
    };

    const iconAction: IconActionStyles = {
        icon: action.label,
        text: action.label,
    };

    const buttonBase: ButtonBaseStyles = {
        height: 42,
        width: {
            medium: "50%",
        },
        borderRadius: border.radius.regular,
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.small,
        backgroundColor: {
            enabled: color.primary,
            pressed: color.primaryLight,
            disabled: color.primaryLight,
        },
    };

    const button: ButtonStyles = {
        container: {
            borderRadius: buttonBase.borderRadius,
            color: {
                secondary: {
                    enabled: color.textOnPrimary,
                    disabled: color.textOnPrimary,
                    pressed: color.textOnPrimary,
                },
                primary: {
                    enabled: color.primary,
                    disabled: color.primaryLight,
                    pressed: color.primaryLight,
                },
                destructive: {
                    enabled: color.textOnDestructive,
                    disabled: color.textOnDestructive,
                    pressed: color.textOnDestructive,
                },
            },
        },
        label: {
            color: {
                secondary: {
                    enabled: color.primary,
                    disabled: color.primaryLight,
                    pressed: color.primaryLight,
                },
                primary: {
                    enabled: color.textOnPrimary,
                    disabled: color.textOnPrimary,
                    pressed: color.textOnPrimary,
                },
                destructive: {
                    enabled: color.destructive,
                    disabled: color.destructiveHighlight,
                    pressed: color.destructiveHighlight,
                },
            },
        },
    };

    const iconButtonBase: IconButtonBaseStyles = {
        container: {
            padding: 4,
            size: 48,
            backgroundColor: {
                enabled: color.inputBackground,
                disabled: color.inputBackgroundDisabled,
                pressed: color.inputBackground,
            },
            borderRadius: "50%",
        },
        icon: interactiveIcon,
    };

    const iconButton: IconButtonStyles = {
        container: {
            size: icon.size.medium + spacing.small,

            backgroundColor: {
                primary: {
                    enabled: color.background,
                    disabled: color.backgroundHighlight,
                    pressed: color.backgroundHighlight,
                },
                secondary: {
                    enabled: color.background,
                    disabled: color.backgroundHighlight,
                    pressed: color.backgroundHighlight,
                },
                destructive: {
                    enabled: color.destructive,
                    disabled: color.destructiveHighlight,
                    pressed: color.destructiveHighlight,
                },
            },
        },
        icon: {
            color: {
                ...action.label.color,
                destructive: {
                    enabled: color.textOnDestructive,
                    pressed: color.textOnDestructive,
                    disabled: color.textOnDestructive,
                },
            },
        },
    };

    const inputBase: InputBaseStyles = {
        container: {
            height: {
                regular: 48,
                compact: 36,
            },
            borderRadius: border.radius.regular,
            padding: spacing.small,
            backgroundColor: {
                enabled: color.inputBackground,
                disabled: color.inputBackgroundDisabled,
            },
        },
        text: {
            fontSize: font.size.regular,
            fontFamily: font.family.sans,
            color: {
                enabled: color.textPrimary,
                disabled: color.textSecondary,
            },
            placeholderColor: color.textSecondary,
        },
    };

    const inputScaffold: InputScaffoldStyles = {
        gap: spacing.tiny,
        mandatoryIndicator: {
            color: color.primaryDark,
        },
        helpText: {
            gap: spacing.tiny,
        },
    };

    const inputAction: InputActionStyles = {
        icon: {
            color: action.label.color.secondary,
        },
    };

    const selectionInput: SelectionInputStyles = {
        container: {
            backgroundColor: {
                ...inputBase.container.backgroundColor,
                pressed: color.backgroundHighlight,
            },
        },
        selectionContainer: {
            gap: spacing.tiny,
        },
        icon: inputAction.icon,
    };

    const swipeAction: SwipeActionStyles = {
        width: 75,
    };

    const floatingContainer: FloatingContainerStyles = {
        parentMargin: spacing.small,
    };

    const menu: MenuStyles = {
        backgroundColor: color.inputBackground,
        borderRadius: inputBase.container.borderRadius,
        gap: spacing.tiny,
        padding: spacing.tiny,
        parentMargin: spacing.medium,
    };

    const menuItem: MenuItemStyles = {
        paddingHorizontal: inputBase.container.padding - menu.padding,
        paddingVertical: spacing.small + spacing.tiny,
        borderRadius: menu.borderRadius / 2,
    };

    const rating: RatingStyles = {
        gap: spacing.tiny,
        icon: {
            color: {
                empty: color.primaryLight,
                half: color.primary,
                full: color.primary,
            },
            size: icon.size.large,
        },
    };

    const alertIndicator: AlertIndicatorStyles = {
        size: 28,
        borderRadius: 14,
        backgroundColor: {
            primary: color.primary,
            secondary: color.secondary,
        },
        color: {
            primary: color.textOnPrimary,
            secondary: color.textOnSecondary,
        },
    };

    const styles: Styles = {
        interactiveText,
        iconBase,
        icon,
        interactiveIcon,
        action,
        iconActionBase,
        iconAction,
        buttonBase,
        button,
        iconButtonBase,
        iconButton,

        inputBase,
        inputScaffold,
        inputAction,
        selectionInput,

        swipeAction,
        floatingContainer,
        menu,
        menuItem,
        rating,
        alertIndicator,

        common: {
            action: {
                fontSize: {
                    ...font.size,
                },
            },
        },
        text: {
            color: color.textPrimary,
            font: {
                caption: {
                    family: font.family.sans,
                    weight: "200",
                    size: font.size.small,
                },
                body: {
                    family: font.family.sans,
                    weight: "400",
                    size: font.size.regular,
                },
                label: {
                    family: font.family.sans,
                    weight: "500",
                    size: font.size.emphasised,
                },
                heading: {
                    family: font.family.sans,
                    weight: "600",
                    size: font.size.large,
                },
                title: {
                    family: font.family.sans,
                    weight: "800",
                    size: font.size.xLarge,
                },
                display: {
                    family: font.family.sans,
                    weight: "800",
                    size: font.size.xxLarge,
                },
            },
        },
        highlightedText,
        dropdownInput: {
            panelGap: 4,
        },
        toggleInput: {
            indicator: {
                size: {
                    compact: icon.size.small,
                    regular: icon.size.medium,
                },
                color: {
                    selected: action.label.color,
                    deselected: {
                        enabled: color.border,
                        disabled: color.border,
                        pressed: color.border,
                    },
                },
            },
            label: {
                gap: spacing.small,
            },
        },
        listItem: {
            spacingMargin: 12,
            internalSpacing: 16,
            borderRadius: border.radius.loose,
            contentItemSpacing: 8,
            contentItemTopMargin: 4,
        },
        avatar: {
            size: {
                large: 80,
                regular: 40,
                small: 32,
            },
            initials: {
                fontWeight: "600",
                fontSize: {
                    large: font.size.xxLarge,
                    regular: font.size.xLarge,
                    small: font.size.large,
                },
            },
            label: {
                fontSize: font.size.tiny,
                fontWeight: "500",
            },
            colors: [
                { background: color.red, foreground: color.textPrimary },
                { background: color.orange, foreground: color.textPrimary },
                { background: color.green, foreground: color.textPrimary },
                { background: color.blue, foreground: color.textPrimary },
                { background: color.purple, foreground: color.textPrimary },
            ],
        },
        toast: {
            horizontalInset: spacing.pageHorizontal + spacing.medium,
            bottomInset: 100,
        },
    };

    return styles;
};

export const MergeStyles = (
    styles: Styles,
    overrides: StyleOverrides | undefined = {},
): Styles => merge({}, styles, overrides);

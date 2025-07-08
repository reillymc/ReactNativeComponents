import type { DeepPartial } from "@reillymc/es-utils";
import merge from "lodash.merge";

import type {
    ActionStyles,
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
    SelectionInputStyles,
    SwipeActionStyles,
    TextInputStyles,
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
    textInput: TextInputStyles;
    toggleInput: ToggleInputStyles;
    selectionInput: SelectionInputStyles;

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
        highlighted: {
            body: font.familyWeight.bold800,
            bodyEmphasized: font.familyWeight.bold800,
            caption: font.familyWeight.bold800,
            display: font.familyWeight.bold800,
            heading: font.familyWeight.bold800,
            label: font.familyWeight.bold800,
            title: font.familyWeight.bold800,
        },
    };

    const iconBase: IconBaseStyles = {
        color: color.textPrimary,
        size: 20,
    };

    const icon: IconStyles = {
        color: {
            primary: color.primary,
            secondary: color.secondary,
            text: color.textPrimary,
        },
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
        height: 40,
        width: "100%",
        borderRadius: border.radius.regular,
        padding: spacing.medium,
        backgroundColor: {
            enabled: color.primary,
            pressed: color.primaryLight,
            disabled: color.primaryLight,
        },
    };

    const button: ButtonStyles = {
        container: {
            borderRadius: buttonBase.borderRadius,
            height: {
                large: 48,
                medium: 40,
            },
            width: {
                medium: 160,
                large: "100%",
            },
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
            height: 48,
            borderRadius: border.radius.regular,
            padding: spacing.small,
            backgroundColor: {
                enabled: color.inputBackground,
                disabled: color.inputBackgroundDisabled,
            },
        },
        text: {
            fontSize: font.size.regular,
            fontFamilyWeight: font.familyWeight.regular400,
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

        common: {
            action: {
                fontSize: {
                    ...font.size,
                },
            },
        },
        text: {
            color: color.textPrimary,
            fontFamilyWeight: {
                caption: font.familyWeight.light200,
                body: font.familyWeight.regular400,
                bodyEmphasized: font.familyWeight.bold600,
                label: font.familyWeight.bold600,
                heading: font.familyWeight.bold600,
                title: font.familyWeight.bold800,
                display: font.familyWeight.bold800,
            },
            fontFamilySize: {
                caption: font.size.small,
                body: font.size.regular,
                bodyEmphasized: font.size.regular,
                label: font.size.emphasised,
                heading: font.size.large,
                title: font.size.xLarge,
                display: font.size.xxLarge,
            },
        },
        highlightedText,
        textInput: {},
        dropdownInput: {
            panelGap: 4,
        },
        toggleInput: {
            indicator: {
                size: icon.size,
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
                large: 100,
                regular: 40,
                small: 28,
            },
            initialsFontFamilyWeight: font.familyWeight.bold600,
            initialsFontSize: font.size.xxLarge,
            labelFontSize: font.size.tiny,
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

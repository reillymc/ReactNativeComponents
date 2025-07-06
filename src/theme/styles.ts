import type { DeepPartial } from "@reillymc/es-utils";
import merge from "lodash.merge";

import type {
    ActionStyles,
    AvatarStyles,
    ButtonBaseStyles,
    ButtonStyles,
    CounterInputStyles,
    DropdownInputStyles,
    HighlightedTextStyles,
    IconActionStyles,
    IconButtonBaseStyles,
    IconButtonStyles,
    IconStyles,
    InputBaseStyles,
    InteractiveIconStyles,
    InteractiveTextStyles,
    ListItemStyles,
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
    interactiveIcon: InteractiveIconStyles;

    action: ActionStyles;
    iconAction: IconActionStyles;

    buttonBase: ButtonBaseStyles;
    button: ButtonStyles;
    iconButtonBase: IconButtonBaseStyles;
    iconButton: IconButtonStyles;

    baseInput: InputBaseStyles;
    common: {
        action: {
            fontSize: {
                [key in "small" | "regular" | "large"]: number;
            };
        };
    };
    textInput: TextInputStyles;
    toggleInput: ToggleInputStyles;
    counterInput: CounterInputStyles;
    dropdownInput: DropdownInputStyles;
    listItem: ListItemStyles;
    avatar: AvatarStyles;

    toast: ToastStyles;
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
            primary: {
                default: color.primary,
                pressed: color.primaryLight,
                disabled: color.primaryLight,
            },
            secondary: {
                default: color.secondary,
                pressed: color.secondaryHighlight,
                disabled: color.secondaryHighlight,
            },
            destructive: {
                default: color.destructive,
                pressed: color.destructiveHighlight,
                disabled: color.destructiveHighlight,
            },
        },
    };

    const icon: IconStyles = {
        color: color.textPrimary,
        size: {
            small: 16,
            medium: 20,
            large: 24,
        },
    };

    const interactiveIcon: InteractiveIconStyles = {
        size: icon.size,
        color: {
            default: color.primary,
            pressed: color.primaryLight,
            disabled: color.primaryLight,
        },
    };

    const action: ActionStyles = {
        label: interactiveText,
    };

    const iconAction: IconActionStyles = {
        gap: spacing.small,
        color: interactiveText.color,
    };

    const buttonBase: ButtonBaseStyles = {
        height: 40,
        width: "100%",
        borderRadius: border.radius.regular,
        padding: spacing.medium,
        color: {
            default: color.primary,
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
            color: interactiveText.color,
        },
        label: {
            color: {
                primary: {
                    default: color.textOnPrimary,
                    disabled: color.textOnPrimary,
                    pressed: color.textOnPrimary,
                },
                secondary: {
                    default: color.textOnSecondary,
                    disabled: color.textOnSecondary,
                    pressed: color.textOnSecondary,
                },
                destructive: {
                    default: color.textOnDestructive,
                    disabled: color.textOnDestructive,
                    pressed: color.textOnDestructive,
                },
            },
        },
    };

    const iconButtonBase: IconButtonBaseStyles = {
        container: {
            padding: 4,
            size: 48,
            color: {
                default: color.inputBackground,
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

            color: interactiveText.color,
        },
        icon: {
            color: button.label.color,
        },
    };

    const counterInput: CounterInputStyles = {
        button: {
            width: 56,
            borderRadius: 0,
        },
    };

    const styles: Styles = {
        interactiveText,
        interactiveIcon,
        icon,
        action,
        iconAction,
        buttonBase,
        button,
        iconButtonBase,
        iconButton,
        counterInput,

        baseInput: {
            height: 48,
            borderRadius: border.radius.regular,
            padding: spacing.small,
            fontSize: font.size.regular,
            fontFamilyWeight: font.familyWeight.regular400,
            textColor: color.textPrimary,
            disabledTextColor: color.textDisabled,
            placeholderTextColor: color.textSecondary,
            backgroundColor: color.inputBackground,
            backgroundColorDisabled: color.inputBackgroundDisabled,
            labelMargin: 6,
            mandatoryColor: color.primaryDark,
            errorColor: color.destructive,
        },
        common: {
            action: {
                fontSize: {
                    ...font.size,
                },
            },
        },
        text: {
            textColor: color.textPrimary,
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
        highlightedText: {
            highlightedFontFamilyWeight: font.familyWeight.bold600,
        },
        textInput: {},
        dropdownInput: {
            panelGap: 4,
        },
        toggleInput: {
            indicator: {
                size: icon.size,
                color: {
                    default: color.border,
                    disabled: color.border,
                    pressed: color.border,
                },
                selectedColor: interactiveText.color,
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

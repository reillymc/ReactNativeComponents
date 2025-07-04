import type { DeepPartial } from "@reillymc/es-utils";
import merge from "lodash.merge";

import type {
    ActionStyles,
    AvatarStyles,
    BaseInputStyles,
    ButtonStyles,
    CounterInputStyles,
    DropdownInputStyles,
    HighlightedTextStyles,
    IconButtonStyles,
    ListItemStyles,
    TextInputStyles,
    TextStyles,
    ToastStyles,
    ToggleInputStyles,
} from "../components";
import type { ButtonBaseStyles } from "../components/buttons/ButtonBase";
import type { IconActionStyles } from "../components/buttons/IconAction";
import type { InteractiveIconStyles } from "../components/buttons/InteractiveIcon";
import type { InteractiveTextStyles } from "../components/buttons/InteractiveText";
import type { Theme } from "./theme";

export type Styles = {
    baseInput: BaseInputStyles;
    common: {
        action: {
            fontSize: {
                [key in "small" | "regular" | "large"]: number;
            };
        };
    };
    text: TextStyles;
    highlightedText: HighlightedTextStyles;
    textInput: TextInputStyles;
    toggleInput: ToggleInputStyles;
    counterInput: CounterInputStyles;
    dropdownInput: DropdownInputStyles;
    listItem: ListItemStyles;
    avatar: AvatarStyles;

    action: ActionStyles;
    interactiveText: InteractiveTextStyles;
    interactiveIcon: InteractiveIconStyles;
    iconAction: IconActionStyles;
    iconButton: IconButtonStyles;
    button: ButtonStyles;
    buttonBase: ButtonBaseStyles;
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
        fontFamilyWeight: font.familyWeight.regular400,
        fontSize: font.size.regular,
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

    const interactiveIcon: InteractiveIconStyles = {
        size: 20,
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

    const buttonBase: ButtonBaseStyles = {
        height: {
            large: 48,
            regular: 40,
        },
        width: {
            regular: 160,
            large: "100%",
        },
        borderRadius: border.radius.regular,
        padding: spacing.medium,
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

    const styles: Styles = {
        baseInput: {
            height: 48,
            width: {
                full: "100%",
                large: "70%",
                small: "45%",
            },
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
        interactiveText,
        textInput: {},
        interactiveIcon,
        action: {
            label: interactiveText,
        },
        iconAction: {
            gap: spacing.small,
        },
        buttonBase,
        button: {
            container: buttonBase,
            label: {
                fontFamilyWeight: font.familyWeight.regular400,
                fontSize: font.size.regular,
                color: {
                    primary: {
                        default: color.textOnPrimary,
                        pressed: color.textOnPrimary,
                        disabled: color.textOnPrimary,
                    },
                    secondary: {
                        default: color.textOnSecondary,
                        pressed: color.textOnSecondary,
                        disabled: color.textOnSecondary,
                    },
                    destructive: {
                        default: color.textOnDestructive,
                        pressed: color.textOnDestructive,
                        disabled: color.textOnDestructive,
                    },
                },
            },
        },
        iconButton: {
            container: {
                borderRadius: "50%",
                height: {
                    large: interactiveIcon.size + spacing.medium,
                    regular: interactiveIcon.size + spacing.small,
                },
                padding: 0,
                width: {
                    large: interactiveIcon.size + spacing.medium,
                    regular: interactiveIcon.size + spacing.small,
                },
                color: {
                    primary: {
                        default: color.background,
                        pressed: color.background,
                        disabled: color.background,
                    },
                    secondary: {
                        default: color.background,
                        pressed: color.background,
                        disabled: color.background,
                    },
                    destructive: {
                        default: color.background,
                        pressed: color.background,
                        disabled: color.background,
                    },
                },
            },
            icon: interactiveIcon,
        },
        dropdownInput: {
            panelGap: 4,
        },
        toggleInput: {
            indicator: {
                size: {
                    small: 16,
                    regular: 20,
                    large: 28,
                },
                color: color.border,
                selectedColor: {
                    flat: color.textPrimary,
                    primary: color.primary,
                    secondary: color.secondary,
                    destructive: color.destructive,
                },
            },
            label: {
                gap: spacing.small,
            },
        },
        counterInput: {
            width: 56,
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

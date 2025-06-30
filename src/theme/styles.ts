import merge from "lodash.merge";

import { DeepPartial } from "@reillymc/es-utils";
import type {
    ActionSize,
    ActionStyles,
    AvatarStyles,
    BaseInputStyles,
    ButtonStyles,
    CounterInputStyles,
    DropdownInputStyles,
    HighlightedTextStyles,
    IconActionStyles,
    IconButtonStyles,
    ListItemStyles,
    TextInputStyles,
    TextStyles,
    ToastStyles,
    ToggleInputStyles,
} from "../components";
import { Theme } from "./theme";

export type Styles = {
    baseInput: BaseInputStyles;
    common: {
        action: {
            fontSize: {
                [key in ActionSize]: number;
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
    iconAction: IconActionStyles;
    button: ButtonStyles;
    iconButton: IconButtonStyles;
    toast: ToastStyles;
};

export type StyleOverrides = DeepPartial<Styles>;

export type CreateStyles = (theme: Theme) => Styles;

export const createDefaultStyles: CreateStyles = ({ border, color, font, spacing }) => ({
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
    textInput: {},
    action: {
        color: {
            // Currently overridden by pressed methods
            primary: color.primary,
            secondary: color.secondary,
            flat: color.textPrimary,
        },
        fontFamilyWeight: font.familyWeight.regular400,
    },
    iconAction: {
        size: {
            small: 20,
            regular: 24,
            large: 32,
        },
    },
    button: {
        height: {
            large: 48,
            regular: 40,
            small: 30,
        },
        width: {
            small: 120,
            regular: 160,
            large: "100%",
        },
        borderRadius: border.radius.regular,
        fontFamilyWeight: font.familyWeight.regular400,
    },
    iconButton: {
        size: {
            large: 80,
            regular: 60,
            small: 48,
        },
        fontSize: {
            ...font.size,
        },
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
            disabledColor: color.textDisabled,
        },
        label: {
            gap: spacing.small,
        },
    },
    counterInput: {
        width: 48,
    },
    title: {
        fontFamilyWeight: font.familyWeight.bold600,
    },
    heading: {
        fontFamilyWeight: font.familyWeight.bold600,
    },
    navigationHeader: {
        fontFamilyWeight: font.familyWeight.regular400,
        fontSize: font.size.large,
        paddingTop: 8,
        paddingBottom: 16,
        paddingLeft: spacing.pageHorizontal,
        paddingRight: spacing.pageHorizontal,
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
});

export const MergeStyles = (styles: Styles, overrides: StyleOverrides | undefined = {}): Styles =>
    merge({}, styles, overrides);

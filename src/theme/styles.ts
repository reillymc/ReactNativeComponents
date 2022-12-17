import {
    ActionSize,
    IconActionStyles,
    ButtonStyles,
    DropdownInputStyles,
    HighlightedTextStyles,
    IconButtonStyles,
    ModalSheetStyles,
    NavigationHeaderStyles,
    TextInputStyles,
    TextStyles,
    ToggleInputStyles,
    ActionStyles,
    ListItemStyles,
    AvatarStyles,
    BaseInputStyles,
} from "../components";
import { DeepPartial } from "../helpers";
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
    navigationHeader: NavigationHeaderStyles;
    modalSheet: ModalSheetStyles;
    toggleInput: ToggleInputStyles;
    dropdownInput: DropdownInputStyles;
    listItem: ListItemStyles;
    avatar: AvatarStyles;

    action: ActionStyles;
    iconAction: IconActionStyles;
    button: ButtonStyles;
    iconButton: IconButtonStyles;
};

export type StyleOverrides = DeepPartial<Styles>;

export type CreateStyles = (theme: Theme) => Styles;

export const createDefaultStyles: CreateStyles = theme => ({
    baseInput: {
        height: 48,
        width: {
            full: "100%",
            large: "70%",
            small: "40%",
        },
        borderRadius: 6,
        padding: 8,
        fontSize: theme.font.size.regular,
        fontFamilyWeight: theme.font.familyWeight.regular400,
        textColor: theme.color.textPrimary,
        disabledTextColor: theme.color.textDisabled,
        placeholderTextColor: theme.color.textSecondary,
        backgroundColor: theme.color.inputBackground,
        backgroundColorDisabled: theme.color.inputBackgroundDisabled,
        labelMarginBottom: 6,
    },
    common: {
        action: {
            fontSize: {
                ...theme.font.size,
            },
        },
    },
    text: {
        textColor: theme.color.textPrimary,
        fontFamilyWeight: {
            body: theme.font.familyWeight.regular400,
            label: theme.font.familyWeight.bold600,
            heading: theme.font.familyWeight.bold600,
            title: theme.font.familyWeight.bold800,
        },
        fontFamilySize: {
            body: theme.font.size.regular,
            label: theme.font.size.emphasised,
            heading: theme.font.size.large,
            title: theme.font.size.xxLarge,
        },
    },
    highlightedText: {
        highlightedFontFamilyWeight: theme.font.familyWeight.bold600,
    },
    modalSheet: {
        borderRadius: 16,
        height: {
            full: "94%",
            mid: "52%",
            small: "24%",
        },
        backgroundColor: theme.color.background,
        backdropColor: theme.color.backgroundOverlay,
    },
    textInput: {},
    action: {
        color: {
            // Currently overridden by pressed methods
            primary: theme.color.primary,
            secondary: theme.color.secondary,
            flat: theme.color.textPrimary,
        },
        fontFamilyWeight: theme.font.familyWeight.regular400,
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
            large: 50,
            regular: 40,
            small: 30,
        },
        width: {
            small: 120,
            regular: 160,
            large: "100%",
        },
        borderRadius: 8,
        fontFamilyWeight: theme.font.familyWeight.regular400,
    },
    iconButton: {
        size: {
            large: 80,
            regular: 60,
            small: 50,
        },
        fontSize: {
            ...theme.font.size,
        },
    },
    dropdownInput: {
        dropdownMarginTop: 4,
    },
    toggleInput: {
        size: 32,
        iconSize: 20,
        borderRadius: 16,
        borderWidth: 2,
    },
    title: {
        fontFamilyWeight: theme.font.familyWeight.bold600,
    },
    heading: {
        fontFamilyWeight: theme.font.familyWeight.bold600,
    },
    navigationHeader: {
        fontFamilyWeight: theme.font.familyWeight.regular400,
        fontSize: theme.font.size.large,
        paddingTop: 56,
        paddingBottom: 16,
        paddingLeft: theme.padding.pageHorizontal,
        paddingRight: theme.padding.pageHorizontal,
    },
    listItem: {
        spacingMargin: 12,
        internalSpacing: 16,
        borderRadius: 16,
        contentItemSpacing: 8,
        contentItemTopMargin: 4,
    },
    avatar: {
        size: 100,
        initialsFontFamilyWeight: theme.font.familyWeight.bold600,
        initialsFontSize: theme.font.size.xxLarge,
        labelFontSize: theme.font.size.tiny,
    },
});

import {
    ActionSize,
    ActionStyles,
    ButtonStyles,
    DropdownInputStyles,
    HighlightedTextStyles,
    IconButtonStyles,
    InputWidth,
    ModalSheetStyles,
    NavigationHeaderStyles,
    TextInputStyles,
    TextStyles,
    ToggleInputStyles,
} from "../components";
import { Theme } from "./theme";

export type Styles = {
    common: {
        input: {
            height: number | string;
            width: {
                [key in InputWidth]: string | number;
            };
            borderRadius: number;
            padding: number;
            textColor: string;
            textColorDisabled: string;
            backgroundColor: string;
            backgroundColorDisabled: string;
            fontSize: number;
            fontFamilyWeight: string;
        };
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

    action: ActionStyles;
    button: ButtonStyles;
    iconButton: IconButtonStyles;
};

export type CreateStyles = (theme: Theme) => Styles;

export const createDefaultStyles: CreateStyles = theme => ({
    common: {
        input: {
            height: 48,
            width: {
                full: "100%",
                large: "70%",
                small: "50%",
            },
            borderRadius: 6,
            padding: 8,
            textColor: theme.color.textPrimary,
            textColorDisabled: theme.color.grey200,
            backgroundColor: theme.color.grey200,
            backgroundColorDisabled: theme.color.grey600,
            fontSize: theme.font.size.regular,
            fontFamilyWeight: theme.font.familyWeight.regular400,
        },
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
            heading: theme.font.familyWeight.bold600,
            title: theme.font.familyWeight.bold800,
        },
        fontFamilySize: {
            body: theme.font.size.regular,
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
    button: {
        height: {
            large: 50,
            regular: 40,
            small: 30,
        },
        width: {
            small: 80,
            regular: 120,
            large: 180,
        },
        borderRadius: 8,
        color: {
            // Currently overridden by pressed methods
            primary: theme.color.primary,
            secondary: theme.color.secondary,
            flat: "transparent",
        },
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
});

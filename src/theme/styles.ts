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
    CounterInputStyles,
} from "../components";
import { DeepPartial } from "../helpers";

import { Theme } from "./theme";

const LINE_HEIGHT_MODIFIER = 8;

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
    counterInput: CounterInputStyles;
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
            small: "45%",
        },
        borderRadius: 6,
        padding: 8,
        fontSize: theme.font.size.regular,
        multilineLineHeight: theme.font.size.regular + LINE_HEIGHT_MODIFIER,
        fontFamilyWeight: theme.font.familyWeight.regular400,
        textColor: theme.color.textPrimary,
        disabledTextColor: theme.color.textDisabled,
        placeholderTextColor: theme.color.textSecondary,
        backgroundColor: theme.color.inputBackground,
        backgroundColorDisabled: theme.color.inputBackgroundDisabled,
        labelMargin: 6,
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
            caption: theme.font.familyWeight.light200,
            body: theme.font.familyWeight.regular400,
            label: theme.font.familyWeight.bold600,
            heading: theme.font.familyWeight.bold600,
            title: theme.font.familyWeight.bold800,
            display: theme.font.familyWeight.bold800,
        },
        fontFamilySize: {
            caption: theme.font.size.small,
            body: theme.font.size.regular,
            label: theme.font.size.emphasised,
            heading: theme.font.size.large,
            title: theme.font.size.xLarge,
            display: theme.font.size.xxLarge,
        },
        lineHeight: {
            caption: theme.font.size.small + 4,
            body: theme.font.size.regular + LINE_HEIGHT_MODIFIER,
            label: theme.font.size.emphasised + LINE_HEIGHT_MODIFIER,
            heading: theme.font.size.large + LINE_HEIGHT_MODIFIER,
            title: theme.font.size.xxLarge + LINE_HEIGHT_MODIFIER,
            display: theme.font.size.xxLarge + LINE_HEIGHT_MODIFIER,
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
            large: 48,
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
            small: 48,
        },
        fontSize: {
            ...theme.font.size,
        },
    },
    dropdownInput: {
        dropdownMarginTop: 4,
    },
    toggleInput: {
        size: {
            small: 20,
            regular: 32,
            large: 48,
        },
        iconSize: {
            small: 14,
            regular: 20,
            large: 28,
        },
        borderRadius: 16,
        borderWidth: 2,
    },
    counterInput: {
        width: 48,
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
        paddingTop: 8,
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
        size: {
            large: 100,
            regular: 40,
            small: 28,
        },
        initialsFontFamilyWeight: theme.font.familyWeight.bold600,
        initialsFontSize: theme.font.size.xxLarge,
        labelFontSize: theme.font.size.tiny,
    },
});

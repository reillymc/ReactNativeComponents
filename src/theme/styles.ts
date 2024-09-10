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
    ModalSheetStyles,
    TextInputStyles,
    TextStyles,
    ToastStyles,
    ToggleInputStyles,
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
    toast: ToastStyles;
};

export type StyleOverrides = DeepPartial<Styles>;

export type CreateStyles = (theme: Theme) => Styles;

export const createDefaultStyles: CreateStyles = ({ border, color, font, padding }) => ({
    baseInput: {
        height: 48,
        width: {
            full: "100%",
            large: "70%",
            small: "45%",
        },
        borderRadius: border.radius.regular,
        padding: padding.small,
        fontSize: font.size.regular,
        multilineLineHeight: font.size.regular + LINE_HEIGHT_MODIFIER,
        fontFamilyWeight: font.familyWeight.regular400,
        textColor: color.textPrimary,
        disabledTextColor: color.textDisabled,
        placeholderTextColor: color.textSecondary,
        backgroundColor: color.inputBackground,
        backgroundColorDisabled: color.inputBackgroundDisabled,
        labelMargin: 6,
        mandatoryColor: color.primaryHighlight,
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
        lineHeight: {
            caption: font.size.small + 4,
            body: font.size.regular + LINE_HEIGHT_MODIFIER,
            bodyEmphasized: font.size.regular + LINE_HEIGHT_MODIFIER,
            label: font.size.emphasised + LINE_HEIGHT_MODIFIER,
            heading: font.size.large + LINE_HEIGHT_MODIFIER,
            title: font.size.xxLarge + LINE_HEIGHT_MODIFIER,
            display: font.size.xxLarge + LINE_HEIGHT_MODIFIER,
        },
    },
    highlightedText: {
        highlightedFontFamilyWeight: font.familyWeight.bold600,
    },
    modalSheet: {
        borderRadius: border.radius.loose,
        height: {
            full: "92.2%",
            mid: "54%",
            small: "26%",
        },
        backgroundColor: color.background,
        backdropColor: color.backgroundOverlay,
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
        borderRadius: border.radius.loose,
        borderWidth: 2,
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
        paddingLeft: padding.pageHorizontal,
        paddingRight: padding.pageHorizontal,
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
        horizontalInset: padding.pageHorizontal + padding.regular,
        bottomInset: 100,
    },
});

export const MergeStyles = (styles: Styles, overrides: StyleOverrides | undefined = {}): Styles => ({
    ...styles,
    ...overrides,
    baseInput: {
        ...styles.baseInput,
        ...overrides?.baseInput,
        width: {
            ...styles.baseInput.width,
            ...(overrides?.baseInput?.width as BaseInputStyles["width"]),
        },
    },
    common: {
        ...styles.common,
        ...overrides?.common,
        action: {
            ...styles.common.action,
            ...overrides?.common?.action,
            fontSize: {
                ...styles.common.action.fontSize,
                ...overrides?.common?.action?.fontSize,
            },
        },
    },
    text: {
        ...styles.text,
        ...overrides?.text,
        fontFamilySize: {
            ...styles.text.fontFamilySize,
            ...overrides?.text?.fontFamilySize,
        },
        fontFamilyWeight: {
            ...styles.text.fontFamilyWeight,
            ...overrides?.text?.fontFamilyWeight,
        },
        lineHeight: {
            ...styles.text.lineHeight,
            ...overrides?.text?.lineHeight,
        },
    },
    highlightedText: {
        ...styles.highlightedText,
        ...overrides?.highlightedText,
    },
    modalSheet: {
        ...styles.modalSheet,
        ...overrides?.modalSheet,
        height: {
            ...styles.modalSheet.height,
            ...overrides?.modalSheet?.height,
        },
    },
    textInput: {
        ...styles.textInput,
        ...overrides?.textInput,
    },
    action: {
        ...styles.action,
        ...overrides?.action,
    },
    iconAction: {
        ...styles.iconAction,
        ...overrides?.iconAction,
        size: {
            ...styles.iconAction.size,
            ...overrides?.iconAction?.size,
        },
    },
    button: {
        ...styles.button,
        ...overrides?.button,
        height: {
            ...styles.button.height,
            ...(overrides?.button?.height as ButtonStyles["height"]),
        },
        width: {
            ...styles.button.width,
            ...(overrides?.button?.width as ButtonStyles["width"]),
        },
    },

    iconButton: {
        ...styles.iconButton,
        ...overrides?.iconButton,
        size: {
            ...styles.iconButton.size,
            ...overrides?.iconButton?.size,
        },
        fontSize: {
            ...styles.iconButton.fontSize,
            ...overrides?.iconButton?.fontSize,
        },
    },
    dropdownInput: {
        ...styles.dropdownInput,
        ...overrides?.dropdownInput,
    },
    toggleInput: {
        ...styles.toggleInput,
        ...overrides?.toggleInput,
        size: {
            ...styles.toggleInput.size,
            ...(overrides?.toggleInput?.size as ToggleInputStyles["size"]),
        },
        iconSize: {
            ...styles.toggleInput.iconSize,
            ...overrides?.toggleInput?.iconSize,
        },
    },
    counterInput: {
        ...styles.counterInput,
        ...overrides?.counterInput,
    },
    //
    //
    //
    listItem: {
        ...styles.listItem,
        ...overrides?.listItem,
    },
    avatar: {
        ...styles.avatar,
        ...overrides?.avatar,
        size: {
            ...styles.avatar.size,
            ...overrides?.avatar?.size,
        },
    },
    toast: {
        ...styles.toast,
        ...overrides?.toast,
    },
});

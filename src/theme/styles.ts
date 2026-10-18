import type { DeepPartial } from "@reillymc/es-utils";
import merge from "lodash.merge";

import type {
    ActionBaseStyles,
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
    ListItemStyles,
    MenuItemStyles,
    MenuStyles,
    RatingInputStyles,
    RatingStyles,
    SelectionInputStyles,
    StateLayerStyles,
    StateTintStyles,
    SwipeActionStyles,
    TagStyles,
    TextStyles,
    ToastStyles,
    ToggleInputStyles,
} from "../components";
import { defaultActionStyles } from "../components/action/Action.styles";
import { defaultActionBaseStyles } from "../components/action/ActionBase.styles";
import { defaultIconActionStyles } from "../components/action/IconAction.styles";
import { defaultIconActionBaseStyles } from "../components/action/IconActionBase.styles";
import { defaultStateTintStyles } from "../components/action/StateTint.styles";
import { defaultAlertIndicatorStyles } from "../components/alert/AlertIndicator.styles";
import { defaultAvatarStyles } from "../components/avatar/Avatar.styles";
import { defaultButtonStyles } from "../components/button/Button.styles";
import { defaultButtonBaseStyles } from "../components/button/ButtonBase.styles";
import { defaultIconButtonStyles } from "../components/button/IconButton.styles";
import { defaultIconButtonBaseStyles } from "../components/button/IconButtonBase.styles";
import { defaultFloatingContainerStyles } from "../components/container/FloatingContainer.styles";
import { defaultIconStyles } from "../components/icon/Icon.styles";
import { defaultIconBaseStyles } from "../components/icon/IconBase.styles";
import { defaultDropdownInputStyles } from "../components/input/DropdownInput.styles";
import { defaultInputActionStyles } from "../components/input/InputAction.styles";
import { defaultInputBaseStyles } from "../components/input/InputBase.styles";
import { defaultInputScaffoldStyles } from "../components/input/InputScaffold.styles";
import { defaultSelectionInputStyles } from "../components/input/SelectionInput.styles";
import { defaultToggleInputStyles } from "../components/input/ToggleInput.styles";
import { defaultListItemStyles } from "../components/listItem/ListItem.styles";
import { defaultMenuStyles } from "../components/menu/Menu.styles";
import { defaultMenuItemStyles } from "../components/menu/MenuItem.styles";
import { defaultRatingStyles } from "../components/rating/Rating.styles";
import { defaultStateLayerStyles } from "../components/surface/StateLayer.styles";
import { defaultSwipeActionStyles } from "../components/swipe/SwipeAction.styles";
import { defaultTagStyles } from "../components/tag/Tag.styles";
import { defaultHighlightedTextStyles } from "../components/text/HighlightedText.styles";
import { defaultTextStyles } from "../components/text/Text.styles";
import { defaultToastStyles } from "../components/toast/Toast.styles";
import type { Theme } from "./theme";

export type Styles = {
    text: TextStyles;
    highlightedText: HighlightedTextStyles;

    icon: IconStyles;
    iconBase: IconBaseStyles;

    actionBase: ActionBaseStyles;
    stateLayer: StateLayerStyles;
    stateTint: StateTintStyles;
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
    ratingInput: RatingInputStyles;

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
    tag: TagStyles;
};

export type StyleOverrides = DeepPartial<Styles>;

export type CreateStyles = (theme: Theme) => Styles;

/**
 * Composes the default `Styles` registry from each component's `styles.ts`
 * factory. Defaults live next to the component that owns them; this module only
 * assembles them (and holds the shared `common` token).
 */
export const createDefaultStyles: CreateStyles = (theme) => ({
    highlightedText: defaultHighlightedTextStyles(),
    iconBase: defaultIconBaseStyles(theme),
    icon: defaultIconStyles(theme),
    actionBase: defaultActionBaseStyles(),
    stateLayer: defaultStateLayerStyles(theme),
    stateTint: defaultStateTintStyles(),
    action: defaultActionStyles(theme),
    iconActionBase: defaultIconActionBaseStyles(theme),
    iconAction: defaultIconActionStyles(theme),
    buttonBase: defaultButtonBaseStyles(theme),
    button: defaultButtonStyles(theme),
    iconButtonBase: defaultIconButtonBaseStyles(theme),
    iconButton: defaultIconButtonStyles(theme),

    inputBase: defaultInputBaseStyles(theme),
    inputScaffold: defaultInputScaffoldStyles(theme),
    inputAction: defaultInputActionStyles(theme),
    selectionInput: defaultSelectionInputStyles(theme),
    ratingInput: null,

    swipeAction: defaultSwipeActionStyles(theme),
    floatingContainer: defaultFloatingContainerStyles(theme),
    menu: defaultMenuStyles(theme),
    menuItem: defaultMenuItemStyles(theme),
    rating: defaultRatingStyles(theme),
    alertIndicator: defaultAlertIndicatorStyles(theme),
    tag: defaultTagStyles(theme),

    common: {
        action: {
            fontSize: {
                ...theme.font.size,
            },
        },
    },
    text: defaultTextStyles(theme),
    dropdownInput: defaultDropdownInputStyles(theme),
    toggleInput: defaultToggleInputStyles(theme),
    listItem: defaultListItemStyles(theme),
    avatar: defaultAvatarStyles(theme),
    toast: defaultToastStyles(theme),
});

export const MergeStyles = (
    styles: Styles,
    overrides: StyleOverrides | undefined = {},
): Styles => merge({}, styles, overrides);

/**
 * Builds the full `Styles` registry for a theme, optionally merged with
 * consumer style overrides.
 */
export const createStyles = (
    theme: Theme,
    overrides?: StyleOverrides,
): Styles => MergeStyles(createDefaultStyles(theme), overrides);

export const MergeStyleSlice = <T>(base: T, override: unknown): T =>
    override === undefined ? base : (merge({}, base, override) as T);

import type { DeepPartial } from "@reillymc/es-utils";
import merge from "lodash.merge";

import { defaultActionStyles } from "../components/action/Action.styles";
import { defaultIconActionStyles } from "../components/action/IconAction.styles";
import { defaultIconActionBaseStyles } from "../components/action/IconActionBase.styles";
import { defaultAlertIndicatorStyles } from "../components/alert/AlertIndicator.styles";
import { defaultAvatarStyles } from "../components/avatar/Avatar.styles";
import { defaultButtonStyles } from "../components/button/Button.styles";
import { defaultButtonBaseStyles } from "../components/button/ButtonBase.styles";
import { defaultIconButtonStyles } from "../components/button/IconButton.styles";
import { defaultIconButtonBaseStyles } from "../components/button/IconButtonBase.styles";
import { defaultAnchoredContainerStyles } from "../components/container/anchoredContainer/AnchoredContainer.styles";
import { defaultIconStyles } from "../components/icon/Icon.styles";
import { defaultIconBaseStyles } from "../components/icon/IconBase.styles";
import { defaultInteractiveIconStyles } from "../components/icon/InteractiveIcon.styles";
import { defaultDropdownInputStyles } from "../components/input/dropdownInput/DropdownInput.styles";
import { defaultInputActionStyles } from "../components/input/InputAction.styles";
import { defaultInputBaseStyles } from "../components/input/InputBase.styles";
import { defaultInputScaffoldStyles } from "../components/input/InputScaffold.styles";
import { defaultSelectionInputStyles } from "../components/input/SelectionInput.styles";
import { defaultToggleInputStyles } from "../components/input/ToggleInput.styles";
import { defaultListItemStyles } from "../components/listItem/ListItem.styles";
import { defaultMenuStyles } from "../components/menu/Menu.styles";
import { defaultMenuItemStyles } from "../components/menu/MenuItem.styles";
import { defaultRatingStyles } from "../components/rating/Rating.styles";
import { defaultSwipeActionStyles } from "../components/swipe/SwipeAction.styles";
import { defaultTagStyles } from "../components/tag/Tag.styles";
import { defaultHighlightedTextStyles } from "../components/text/HighlightedText.styles";
import { defaultInteractiveTextStyles } from "../components/text/InteractiveText.styles";
import { defaultTextStyles } from "../components/text/Text.styles";
import { defaultToastStyles } from "../components/toast/Toast.styles";
import type { Theme } from "../theme/theme";
import type { StyleFactory } from "./styleFactory";

/**
 * Composes the default style registry from each component's `styles.ts`
 * factory.
 */
export const createDefaultStyles = (theme: Theme) => ({
    interactiveText: defaultInteractiveTextStyles(theme),
    highlightedText: defaultHighlightedTextStyles(theme),
    iconBase: defaultIconBaseStyles(theme),
    icon: defaultIconStyles(theme),
    interactiveIcon: defaultInteractiveIconStyles(theme),
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
    anchoredContainer: defaultAnchoredContainerStyles(theme),
    menu: defaultMenuStyles(theme),
    menuItem: defaultMenuItemStyles(theme),
    rating: defaultRatingStyles(theme),
    alertIndicator: defaultAlertIndicatorStyles(theme),
    tag: defaultTagStyles(theme),

    text: defaultTextStyles(theme),
    dropdownInput: defaultDropdownInputStyles(theme),
    toggleInput: defaultToggleInputStyles(theme),
    listItem: defaultListItemStyles(theme),
    avatar: defaultAvatarStyles(theme),
    toast: defaultToastStyles(theme),
});

export type Styles = ReturnType<typeof createDefaultStyles>;

export type StyleOverrides<E extends object = Record<never, never>> =
    DeepPartial<Styles & E>;

/**
 * Builds the full `Styles` registry for a theme, optionally merged with
 * app-owned component style overrides.
 *
 * Style overrides are supplied as a factory so they can derive values from
 * the resolved base theme and are merged over the default registry.
 */
export const createStyles = <E extends object = Record<never, never>>(
    theme: Theme,
    createOverrides?: StyleFactory<E>,
): Styles & E =>
    merge({}, createDefaultStyles(theme), createOverrides?.(theme)) as Styles &
        E;

export const mergeStyle = <T>(base: T, override: unknown): T =>
    override === undefined ? base : (merge({}, base, override) as T);

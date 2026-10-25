import { defaultActionTheme } from "../actions/action/Action.theme";
import { defaultActionBaseTheme } from "../actions/action/ActionBase.theme";
import { defaultIconActionTheme } from "../actions/action/IconAction.theme";
import { defaultIconActionBaseTheme } from "../actions/action/IconActionBase.theme";
import { defaultStateTintTheme } from "../actions/action/StateTint.theme";
import { defaultButtonTheme } from "../actions/button/Button.theme";
import { defaultButtonBaseTheme } from "../actions/button/ButtonBase.theme";
import { defaultIconButtonTheme } from "../actions/button/IconButton.theme";
import { defaultIconButtonBaseTheme } from "../actions/button/IconButtonBase.theme";
import { defaultStateLayerTheme } from "../actions/surface/StateLayer.theme";
import { defaultSwipeActionTheme } from "../actions/swipeAction/SwipeAction.theme";
import { defaultAvatarTheme } from "../display/avatar/Avatar.theme";
import { defaultContentRowTheme } from "../display/contentRow/ContentRow.theme";
import { defaultListItemTheme } from "../display/listItem/ListItem.theme";
import { defaultRatingTheme } from "../display/rating/Rating.theme";
import { defaultTagTheme } from "../display/tag/Tag.theme";
import { defaultTagIconTheme } from "../display/tag/TagIcon.theme";
import { defaultAlertIndicatorTheme } from "../feedback/alert/AlertIndicator.theme";
import { defaultToastTheme } from "../feedback/toast/Toast.theme";
import { defaultFormContainerTheme } from "../forms/formContainer/FormContainer.theme";
import { defaultFormRowTheme } from "../forms/formRow/FormRow.theme";
import { defaultDropdownInputTheme } from "../forms/input/dropdownInput/DropdownInput.theme";
import { defaultInputActionTheme } from "../forms/input/InputAction.theme";
import { defaultInputBaseTheme } from "../forms/input/InputBase.theme";
import { defaultInputRowContainerTheme } from "../forms/input/InputRowContainer.theme";
import { defaultInputScaffoldTheme } from "../forms/input/InputScaffold.theme";
import { defaultRatingInputTheme } from "../forms/input/RatingInput.theme";
import { defaultSelectionInputTheme } from "../forms/input/SelectionInput.theme";
import { defaultTimeInputTheme } from "../forms/input/TimeInput.theme";
import { defaultToggleInputTheme } from "../forms/input/ToggleInput.theme";
import { defaultIconTheme } from "../icons/Icon.theme";
import { defaultIconBaseTheme } from "../icons/IconBase.theme";
import { defaultAnchoredContainerTheme } from "../overlays/anchoredContainer/AnchoredContainer.theme";
import { defaultMenuTheme } from "../overlays/menu/Menu.theme";
import { defaultMenuItemTheme } from "../overlays/menu/MenuItem.theme";
import { defaultHighlightedTextTheme } from "../typography/text/HighlightedText.theme";
import { defaultTextTheme } from "../typography/text/Text.theme";
import type { Theme, ThemeFactory } from "./theme";

export type ThemeDefinitions = {
    [K in keyof Theme]: ThemeFactory<K>;
};

export const definitions: ThemeDefinitions = {
    text: defaultTextTheme,
    highlightedText: defaultHighlightedTextTheme,
    iconBase: defaultIconBaseTheme,
    icon: defaultIconTheme,
    actionBase: defaultActionBaseTheme,
    action: defaultActionTheme,
    iconActionBase: defaultIconActionBaseTheme,
    iconAction: defaultIconActionTheme,
    stateTint: defaultStateTintTheme,
    stateLayer: defaultStateLayerTheme,
    buttonBase: defaultButtonBaseTheme,
    button: defaultButtonTheme,
    iconButtonBase: defaultIconButtonBaseTheme,
    iconButton: defaultIconButtonTheme,
    inputBase: defaultInputBaseTheme,
    inputScaffold: defaultInputScaffoldTheme,
    inputAction: defaultInputActionTheme,
    inputRowContainer: defaultInputRowContainerTheme,
    timeInput: defaultTimeInputTheme,
    selectionInput: defaultSelectionInputTheme,
    toggleInput: defaultToggleInputTheme,
    dropdownInput: defaultDropdownInputTheme,
    rating: defaultRatingTheme,
    ratingInput: defaultRatingInputTheme,
    alertIndicator: defaultAlertIndicatorTheme,
    tag: defaultTagTheme,
    tagIcon: defaultTagIconTheme,
    contentRow: defaultContentRowTheme,
    listItem: defaultListItemTheme,
    menu: defaultMenuTheme,
    menuItem: defaultMenuItemTheme,
    avatar: defaultAvatarTheme,
    toast: defaultToastTheme,
    swipeAction: defaultSwipeActionTheme,
    anchoredContainer: defaultAnchoredContainerTheme,
    formContainer: defaultFormContainerTheme,
    formRow: defaultFormRowTheme,
};

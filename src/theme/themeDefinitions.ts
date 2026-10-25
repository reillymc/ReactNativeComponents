import { defaultActionTheme } from "../components/action/Action.theme";
import { defaultActionBaseTheme } from "../components/action/ActionBase.theme";
import { defaultIconActionTheme } from "../components/action/IconAction.theme";
import { defaultIconActionBaseTheme } from "../components/action/IconActionBase.theme";
import { defaultStateTintTheme } from "../components/action/StateTint.theme";
import { defaultAlertIndicatorTheme } from "../components/alert/AlertIndicator.theme";
import { defaultAvatarTheme } from "../components/avatar/Avatar.theme";
import { defaultButtonTheme } from "../components/button/Button.theme";
import { defaultButtonBaseTheme } from "../components/button/ButtonBase.theme";
import { defaultIconButtonTheme } from "../components/button/IconButton.theme";
import { defaultIconButtonBaseTheme } from "../components/button/IconButtonBase.theme";
import { defaultAnchoredContainerTheme } from "../components/container/anchoredContainer/AnchoredContainer.theme";
import { defaultFormContainerTheme } from "../components/container/FormContainer.theme";
import { defaultFormRowTheme } from "../components/container/FormRow.theme";
import { defaultIconTheme } from "../components/icon/Icon.theme";
import { defaultIconBaseTheme } from "../components/icon/IconBase.theme";
import { defaultDropdownInputTheme } from "../components/input/dropdownInput/DropdownInput.theme";
import { defaultInputActionTheme } from "../components/input/InputAction.theme";
import { defaultInputBaseTheme } from "../components/input/InputBase.theme";
import { defaultInputRowContainerTheme } from "../components/input/InputRowContainer.theme";
import { defaultInputScaffoldTheme } from "../components/input/InputScaffold.theme";
import { defaultRatingInputTheme } from "../components/input/RatingInput.theme";
import { defaultSelectionInputTheme } from "../components/input/SelectionInput.theme";
import { defaultTimeInputTheme } from "../components/input/TimeInput.theme";
import { defaultToggleInputTheme } from "../components/input/ToggleInput.theme";
import { defaultListItemTheme } from "../components/listItem/ListItem.theme";
import { defaultMenuTheme } from "../components/menu/Menu.theme";
import { defaultMenuItemTheme } from "../components/menu/MenuItem.theme";
import { defaultRatingTheme } from "../components/rating/Rating.theme";
import { defaultStateLayerTheme } from "../components/surface/StateLayer.theme";
import { defaultSwipeActionTheme } from "../components/swipe/SwipeAction.theme";
import { defaultTagTheme } from "../components/tag/Tag.theme";
import { defaultTagIconTheme } from "../components/tag/TagIcon.theme";
import { defaultHighlightedTextTheme } from "../components/text/HighlightedText.theme";
import { defaultTextTheme } from "../components/text/Text.theme";
import { defaultToastTheme } from "../components/toast/Toast.theme";
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

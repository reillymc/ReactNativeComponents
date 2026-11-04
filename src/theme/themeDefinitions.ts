import { defaultActionTheme } from "../actions/action/Action.theme";
import { defaultActionBaseTheme } from "../actions/action/ActionBase.theme";
import { defaultIconActionTheme } from "../actions/action/IconAction.theme";
import { defaultIconActionBaseTheme } from "../actions/action/IconActionBase.theme";
import { defaultButtonTheme } from "../actions/button/Button.theme";
import { defaultButtonBaseTheme } from "../actions/button/ButtonBase.theme";
import { defaultIconButtonTheme } from "../actions/button/IconButton.theme";
import { defaultIconButtonBaseTheme } from "../actions/button/IconButtonBase.theme";
import { defaultStateLayerTheme } from "../actions/surface/StateLayer.theme";
import { defaultSwipeActionTheme } from "../actions/swipeAction/SwipeAction.theme";
import { defaultAvatarTheme } from "../display/avatar/Avatar.theme";
import { defaultBadgeTheme } from "../display/badge/Badge.theme";
import { defaultContentRowTheme } from "../display/contentRow/ContentRow.theme";
import { defaultListItemTheme } from "../display/listItem/ListItem.theme";
import { defaultRatingTheme } from "../display/rating/Rating.theme";
import { defaultTagTheme } from "../display/tag/Tag.theme";
import { defaultTagIconTheme } from "../display/tag/TagIcon.theme";
import { defaultToggleIndicatorTheme } from "../display/toggleIndicator/ToggleIndicator.theme";
import { defaultToastTheme } from "../feedback/toast/Toast.theme";
import { defaultFieldTheme } from "../forms/field/Field.theme";
import { defaultFormContainerTheme } from "../forms/formContainer/FormContainer.theme";
import { defaultFormRowTheme } from "../forms/formRow/FormRow.theme";
import { defaultComboboxInputTheme } from "../forms/input/comboboxInput/ComboboxInput.theme";
import { defaultCounterInputTheme } from "../forms/input/counterInput/CounterInput.theme";
import { defaultNumberInputTheme } from "../forms/input/numberInput/NumberInput.theme";
import { defaultRatingInputTheme } from "../forms/input/ratingInput/RatingInput.theme";
import { defaultSelectionInputTheme } from "../forms/input/selectionInput/SelectionInput.theme";
import { defaultTextInputTheme } from "../forms/input/TextInput.theme";
import { defaultTimeInputTheme } from "../forms/input/timeInput/TimeInput.theme";
import { defaultToggleInputTheme } from "../forms/input/toggleInput/ToggleInput.theme";
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
    action: defaultActionTheme,
    actionBase: defaultActionBaseTheme,
    iconActionBase: defaultIconActionBaseTheme,
    iconAction: defaultIconActionTheme,
    buttonBase: defaultButtonBaseTheme,
    button: defaultButtonTheme,
    iconButtonBase: defaultIconButtonBaseTheme,
    iconButton: defaultIconButtonTheme,
    stateLayer: defaultStateLayerTheme,
    field: defaultFieldTheme,
    textInput: defaultTextInputTheme,
    numberInput: defaultNumberInputTheme,
    counterInput: defaultCounterInputTheme,
    timeInput: defaultTimeInputTheme,
    selectionInput: defaultSelectionInputTheme,
    toggleInput: defaultToggleInputTheme,
    toggleIndicator: defaultToggleIndicatorTheme,
    comboboxInput: defaultComboboxInputTheme,
    rating: defaultRatingTheme,
    ratingInput: defaultRatingInputTheme,
    badge: defaultBadgeTheme,
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

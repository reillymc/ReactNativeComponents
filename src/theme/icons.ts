import type { FC } from "react";

import type {
    CounterInputIcons,
    InputScaffoldIcons,
    NumberInputIcons,
    RatingIcons,
    RatingInputIcons,
    SelectionInputIcons,
    TimeInputIcons,
    ToggleInputIcons,
} from "../components";
import { type AnyIconSet, type IconSet, Octicons, Stars } from "../icons";

export type ComponentIconAssets<K extends string> = K;

type ComponentIcons = {
    inputScaffold: InputScaffoldIcons;
    counterInput: CounterInputIcons;
    numberInput: NumberInputIcons;
    selectionInput: SelectionInputIcons;
    timeInput: TimeInputIcons;
    toggleInput: ToggleInputIcons;
    rating: RatingIcons;
    ratingInput: RatingInputIcons;
};

export type Icons = {
    [K in keyof ComponentIcons]: {
        [I in ComponentIcons[K]]: {
            iconSet: AnyIconSet;
            iconName: string;
        };
    };
};

type InferGlyph<T> =
    T extends IconSet<infer G>
        ? G
        : T extends FC<{ name: infer G }>
          ? G
          : string;

export type ComponentIconsConfig = {
    [Category in keyof ComponentIcons]: {
        [SubKey in ComponentIcons[Category]]: {
            iconSet: AnyIconSet;
            iconName: string;
        };
    };
};

type ValidateConfig<C> = {
    [Category in keyof ComponentIcons]: {
        [SubKey in ComponentIcons[Category]]: Category extends keyof C
            ? SubKey extends keyof C[Category]
                ? C[Category][SubKey] extends { iconSet: infer S }
                    ? { iconSet: S; iconName: InferGlyph<S> }
                    : never
                : never
            : never;
    };
};

export const createIcons = <C extends ComponentIconsConfig>(
    config: C & ValidateConfig<C>,
): C => config;

export const DefaultIcons = createIcons({
    inputScaffold: {
        error: { iconSet: Octicons, iconName: "exclamation" },
    },
    counterInput: {
        decrease: { iconSet: Octicons, iconName: "dash" },
        increase: { iconSet: Octicons, iconName: "plus" },
    },
    numberInput: {
        number: { iconSet: Octicons, iconName: "infinity" },
        fraction: { iconSet: Octicons, iconName: "number" },
        range: { iconSet: Octicons, iconName: "arrow-both" },
    },
    selectionInput: {
        showOptions: { iconSet: Octicons, iconName: "chevron-down" },
    },
    timeInput: {
        time: { iconSet: Octicons, iconName: "clock" },
    },
    toggleInput: {
        outline: { iconSet: Octicons, iconName: "circle" },
    },
    rating: {
        empty: { iconSet: Stars, iconName: "empty" },
        full: { iconSet: Stars, iconName: "full" },
        half: { iconSet: Stars, iconName: "half" },
    },
    ratingInput: {
        empty: { iconSet: Stars, iconName: "empty" },
        full: { iconSet: Stars, iconName: "full" },
        half: { iconSet: Stars, iconName: "half" },
    },
});

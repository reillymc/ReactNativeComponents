import type { FC } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

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
import { type AnyIconSet, type IconSet, UiIcons } from "../icons";

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
        error: { iconSet: UiIcons, iconName: "exclamation" },
    },
    counterInput: {
        decrease: { iconSet: UiIcons, iconName: "dash" },
        increase: { iconSet: UiIcons, iconName: "plus" },
    },
    numberInput: {
        number: { iconSet: UiIcons, iconName: "infinity" },
        fraction: { iconSet: UiIcons, iconName: "number" },
        range: { iconSet: UiIcons, iconName: "arrow-both" },
    },
    selectionInput: {
        showOptions: { iconSet: UiIcons, iconName: "chevron-down" },
    },
    timeInput: {
        time: { iconSet: UiIcons, iconName: "clock" },
    },
    toggleInput: {
        outline: { iconSet: UiIcons, iconName: "circle" },
    },
    rating: {
        empty: { iconSet: UiIcons, iconName: "star-empty" },
        full: { iconSet: UiIcons, iconName: "star-full" },
        half: { iconSet: UiIcons, iconName: "star-half" },
    },
    ratingInput: {
        empty: { iconSet: UiIcons, iconName: "star-empty" },
        full: { iconSet: UiIcons, iconName: "star-full" },
        half: { iconSet: UiIcons, iconName: "star-half" },
    },
});

export const MergeIcons = (overrides?: DeepPartial<Icons>): Icons => {
    if (!overrides) return DefaultIcons;

    const merged = { ...DefaultIcons } as Record<
        string,
        Record<string, unknown> | undefined
    >;

    for (const [category, slots] of Object.entries(overrides)) {
        if (!slots) continue;
        merged[category] = { ...merged[category], ...slots };
    }

    return merged as Icons;
};

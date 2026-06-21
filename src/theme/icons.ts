import type { FC } from "react";
import type { ColorValue } from "react-native";
import {
    Octicons,
    type OcticonsIconName,
} from "@react-native-vector-icons/octicons";

import type {
    CounterInputIcons,
    InputScaffoldIcons,
    NumberInputIcons,
    SelectionInputIcons,
    TimeInputIcons,
    ToggleInputIcons,
} from "../components";

export type GlyphMap = Record<string, number | string>;

export type IconComponent<G extends GlyphMap> = FC<
    {
        name: keyof G;
        size?: number;
        color?: ColorValue;
    } & object
>;

export type ComponentIconAssets<K extends string> = K;

type ComponentAssetMap<G extends string, K extends string> = Record<K, G>;

export type Icons<G extends string> = {
    iconSet: IconComponent<Record<G, number | string>>;

    inputScaffold: ComponentAssetMap<G, InputScaffoldIcons>;
    counterInput: ComponentAssetMap<G, CounterInputIcons>;
    numberInput: ComponentAssetMap<G, NumberInputIcons>;
    selectionInput: ComponentAssetMap<G, SelectionInputIcons>;
    timeInput: ComponentAssetMap<G, TimeInputIcons>;
    toggleInput: ComponentAssetMap<G, ToggleInputIcons>;
};

export const DefaultIcons: Icons<OcticonsIconName> = {
    iconSet: Octicons,
    inputScaffold: {
        error: "exclamation",
    },
    counterInput: {
        decrease: "dash",
        increase: "plus",
    },
    numberInput: {
        number: "infinity",
        fraction: "number",
        range: "arrow-both",
    },
    selectionInput: {
        showOptions: "chevron-down",
    },
    timeInput: {
        time: "clock",
    },
    toggleInput: {
        outline: "circle",
    },
};

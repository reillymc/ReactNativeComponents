import type { FC, PropsWithChildren } from "react";
import { type ColorValue, StyleSheet, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";

export type MenuStyles = {
    parentMargin: number;
    backgroundColor: ColorValue;
    borderRadius: number;
    padding: number;
    gap: number;
};

export type MenuProps = PropsWithChildren<{
    style?: DeepPartial<MenuStyles>;
    reverse?: boolean;
}>;

export const Menu: FC<MenuProps> = ({ style, reverse, children }) => {
    const [styles] = useThemedStyles("menu", createStyles, {
        styles: { menu: style },
    });

    return (
        <View
            style={[
                styles.container,
                { flexDirection: reverse ? "column-reverse" : "column" },
            ]}
        >
            {children}
        </View>
    );
};

const createStyles = ({ theme: { color }, styles: { menu } }: ThemedStyles) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: menu.backgroundColor,
            borderRadius: menu.borderRadius,
            padding: menu.padding,
            gap: menu.gap,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: color.border,
        },
    });
    return styles;
};

import { Children, type FC, isValidElement, type ReactNode } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, useComponent } from "../../internal";

export interface FormRowTheme {
    gap: number;
}

export interface FormRowProps {
    theme?: DeepPartial<FormRowTheme>;
    style?: StyleProp<ViewStyle>;

    children?: ReactNode;
}

export const FormRow: FC<FormRowProps> = ({
    theme: themeOverrides,
    style,
    children,
}) => {
    const { styles } = useComponent("formRow", {
        themeOverrides,
        createStyles,
    });

    const items = Children.toArray(children);

    return (
        <View style={[styles.container, style]}>
            {items.map((child) => (
                <View
                    key={isValidElement(child) ? child.key : String(child)}
                    style={styles.cell}
                >
                    {child}
                </View>
            ))}
        </View>
    );
};

const createStyles = defineStyles((theme: FormRowTheme) => ({
    container: {
        alignSelf: "stretch",
        minWidth: 0,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: theme.gap,
    },
    cell: {
        flexGrow: 1,
        flexBasis: 0,
        minWidth: 0,
    },
}));

import { Children, type FC, isValidElement, type ReactNode } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";

import { useTheme } from "../../hooks";

export interface FormRowProps {
    /**
     * Horizontal gap between fields. Defaults to `spacing.small`.
     */
    gap?: number;

    style?: StyleProp<ViewStyle>;

    children?: ReactNode;
}

export const FormRow: FC<FormRowProps> = ({ gap, style, children }) => {
    const {
        theme: { spacing },
    } = useTheme();

    const items = Children.toArray(children);

    return (
        <View style={[styles.container, { gap: gap ?? spacing.small }, style]}>
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

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        minWidth: 0,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    cell: {
        flexGrow: 1,
        flexBasis: 0,
        minWidth: 0,
    },
});

import type { FC, ReactNode } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";

import { defineStyles, useComponent } from "../../internal";
import { fieldLabelA11y } from "./a11y";
import { useFieldContext } from "./FieldContext";

export type FieldRowProps = {
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
};

/**
 * Horizontal row for field controls and trailing actions.
 *
 * Inside a `Field`, it exposes the field label as an accessibility group and is
 * the single container for multi-control rows.
 *
 * Should wrap any form input contents with more than one horizontal child.
 */
export const FieldRow: FC<FieldRowProps> = ({ style, children }) => {
    const field = useFieldContext();
    const { styles } = useComponent("field", { createStyles });

    return (
        <View
            role={field ? "group" : undefined}
            {...fieldLabelA11y(field)}
            style={[styles.row, style]}
        >
            {children}
        </View>
    );
};

const createStyles = defineStyles(() => ({
    row: {
        flexDirection: "row",
        flexGrow: 1,
        minWidth: 0,
    },
}));

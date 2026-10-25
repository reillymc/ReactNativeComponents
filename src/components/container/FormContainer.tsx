import type { FC, ReactNode } from "react";
import {
    Keyboard,
    Platform,
    Pressable,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, useComponent } from "../shared";

export interface FormContainerTheme {
    gap: number;
}

export interface FormContainerProps {
    theme?: DeepPartial<FormContainerTheme>;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}

export const FormContainer: FC<FormContainerProps> = ({
    style,
    theme: themeOverrides,
    children,
}) => {
    const { styles } = useComponent("formContainer", {
        themeOverrides,
        createStyles,
    });

    const containerStyle = [styles.container, style];

    return Platform.OS === "web" ? (
        <View style={containerStyle}>{children}</View>
    ) : (
        <Pressable
            accessible={false}
            style={containerStyle}
            onPress={() => Keyboard.dismiss()}
        >
            {children}
        </Pressable>
    );
};

const createStyles = defineStyles((theme: FormContainerTheme) => ({
    container: {
        alignSelf: "stretch",
        width: "100%",
        minWidth: 0,
        gap: theme.gap,
    },
}));

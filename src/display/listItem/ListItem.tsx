import type { FC, ReactNode } from "react";
import {
    type ColorValue,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";
import { type DeepPartial, Undefined } from "@reillymc/es-utils";

import { ActionBase } from "../../actions/action";
import { defineStyles, type PropFilter, useComponent } from "../../internal";
import {
    SwipeableContainer,
    type SwipeableContainerProps,
} from "../../layout/swipeable";
import { Text } from "../../typography/text";

type ListItemVariant = "default" | "compact";

export interface ListItemTheme {
    surface: {
        backgroundColor: ColorValue;
        borderRadius: number;
        paddingTop: number;
        paddingBottom: number;
        paddingStart: number;
        paddingEnd: number;
    };
    internalGap: number;
    textColor: ColorValue;
}

export interface ListItemProps {
    heading?: ReactNode;
    header?: ReactNode;

    /**
     * Content for the leading slot.
     */
    avatar?: ReactNode;

    /**
     * Content for the trailing slot.
     */
    alert?: ReactNode;

    variant?: ListItemVariant;

    /**
     * Main content, typically one or more `ContentRow` elements.
     */
    content?: ReactNode;

    /**
     * Content rendered below the body.
     */
    footer?: ReactNode;

    swipeActions?: SwipeableContainerProps["rightActions"];
    style?: StyleProp<ViewStyle>;
    theme?: DeepPartial<ListItemTheme>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export const ListItem: FC<ListItemProps> = ({
    avatar,
    alert,
    heading,
    footer,
    header,
    variant = "default",
    content,
    swipeActions,
    style,
    theme: themeOverrides,
    contentContainerStyle,
    onPress,
}) => {
    const filteredActions = swipeActions?.filter(Undefined);

    const { styles, theme } = useComponent("listItem", {
        themeOverrides,
        props: { variant },
        createStyles,
    });

    const listContent = (
        <>
            {header}
            <View style={styles.bodyContainer}>
                <View style={styles.innerContainer}>
                    {!!avatar && <View style={styles.avatar}>{avatar}</View>}
                    <View
                        style={[styles.contentContainer, contentContainerStyle]}
                    >
                        {!!heading && typeof heading === "string" ? (
                            <Text
                                variant="heading"
                                numberOfLines={2}
                                theme={{ color: theme.textColor }}
                            >
                                {heading}
                            </Text>
                        ) : (
                            heading
                        )}
                        {content}
                    </View>
                </View>
                {!!alert && <View style={styles.alert}>{alert}</View>}
            </View>
            {footer}
        </>
    );

    const innerContent = onPress ? (
        <ActionBase
            hitSlop={0}
            onPress={onPress}
            style={[styles.pressableContainer, style]}
        >
            {listContent}
        </ActionBase>
    ) : (
        <View style={[styles.pressableContainer, style]}>{listContent}</View>
    );

    return (
        <View style={styles.container}>
            {filteredActions?.length ? (
                <SwipeableContainer rightActions={filteredActions}>
                    <View>{innerContent}</View>
                </SwipeableContainer>
            ) : (
                innerContent
            )}
        </View>
    );
};

const createStyles = defineStyles(
    (theme: ListItemTheme, props: PropFilter<ListItemProps, "variant">) => ({
        container: {
            overflow: "hidden",
            width: "100%",
        },
        pressableContainer: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.surface.backgroundColor,
            borderRadius:
                props.variant === "compact" ? 0 : theme.surface.borderRadius,
            paddingTop: theme.surface.paddingTop,
            paddingBottom: theme.surface.paddingBottom,
            paddingStart: theme.surface.paddingStart,
            paddingEnd: theme.surface.paddingEnd,
            gap: theme.internalGap,
        },
        bodyContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            gap: theme.internalGap,
        },
        innerContainer: {
            flexDirection: "row",
            flexShrink: 1,
            gap: theme.internalGap,
        },
        avatar: {
            alignItems: "center",
            justifyContent: "center",
        },
        contentContainer: {
            flexShrink: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
        },
        alert: {
            alignItems: "center",
            justifyContent: "center",
        },
    }),
);

import type { FC, ReactNode } from "react";
import {
    type ColorValue,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";
import { type DeepPartial, Undefined } from "@reillymc/es-utils";

import { ActionBase } from "../action";
import { defineStyles, type PropFilter, useComponent } from "../shared";
import { SwipeableContainer, type SwipeableContainerProps } from "../swipe";
import { Text } from "../text";

type ListItemVariant = "default" | "compact";

export interface ListItemTheme {
    spacingMargin: number;
    internalSpacing: number;
    borderRadius: number;
    contentItemSpacing: number;
    backgroundColor: ColorValue;
    surfaceColor: ColorValue;
}

export interface ListItemProps {
    heading?: ReactNode;
    header?: ReactNode;
    /**
     * [ListItemAvatar](./ListItemAvatar.tsx)
     */
    avatar?: ReactNode;
    /**
     * [ListItemAlert](./ListItemAlert.tsx)
     */
    alert?: ReactNode;
    variant?: ListItemVariant;

    /**
     * Supports:
     * - `<ListItemRow/>`
     * - `<ListItemRow/>[]`
     */
    contentRows?: Array<ReactNode>;

    /**
     * [ListItemFooter](./ListItemFooter.tsx)
     */
    footer?: ReactNode;

    swipeActions?: SwipeableContainerProps["rightActions"];
    style?: StyleProp<ViewStyle>;
    theme?: DeepPartial<ListItemTheme>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

const EMPTY_CONTENT_ROWS: Array<ReactNode> = [];

export const ListItem: FC<ListItemProps> = ({
    avatar,
    alert,
    heading,
    footer,
    header,
    variant = "default",
    contentRows = EMPTY_CONTENT_ROWS,
    swipeActions,
    style,
    theme: themeOverrides,
    contentContainerStyle,
    onPress,
}) => {
    const filteredRows = contentRows.filter(Undefined);

    const filteredActions = swipeActions?.filter(Undefined);

    const { styles } = useComponent("listItem", {
        themeOverrides,
        props: { variant },
        createStyles,
    });

    const content = (
        <>
            {header}
            <View style={styles.bodyContainer}>
                <View style={styles.innerContainer}>
                    {avatar}
                    <View
                        style={[styles.contentContainer, contentContainerStyle]}
                    >
                        {!!heading && typeof heading === "string" ? (
                            <Text variant="heading" numberOfLines={2}>
                                {heading}
                            </Text>
                        ) : (
                            heading
                        )}
                        {filteredRows}
                    </View>
                </View>
                {alert}
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
            {content}
        </ActionBase>
    ) : (
        <View style={[styles.pressableContainer, style]}>{content}</View>
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
            backgroundColor: theme.backgroundColor,
            borderRadius:
                props.variant === "compact" ? undefined : theme.borderRadius,
            overflow: "hidden",
            width: "100%",
        },
        pressableContainer: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.surfaceColor,
            borderRadius:
                props.variant === "compact" ? undefined : theme.borderRadius,
        },
        bodyContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        innerContainer: {
            flexDirection: "row",
            flexShrink: 1,
        },
        contentContainer: {
            flexShrink: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            padding: theme.internalSpacing,
        },
    }),
);

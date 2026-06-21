import type { FC, ReactNode } from "react";
import {
    Pressable,
    type StyleProp,
    StyleSheet,
    View,
    type ViewStyle,
} from "react-native";
import { Undefined } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { SwipeableContainer, type SwipeableContainerProps } from "../container";
import { Text } from "../text";

type ListItemVariant = "default" | "compact";

export interface ListItemStyles {
    spacingMargin: number;
    internalSpacing: number;
    borderRadius: number;
    contentItemTopMargin: number;
    contentItemSpacing: number;
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
    contentRows = [],
    swipeActions,
    style,
    contentContainerStyle,
    onPress,
}) => {
    const filteredRows = contentRows.filter(Undefined);

    const filteredActions = swipeActions?.filter(Undefined);

    const [styles] = useThemedStyles("listItem", createStyles, {
        props: { variant },
    });

    const innerContent = (
        <Pressable onPress={onPress} style={[styles.pressableContainer, style]}>
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
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {filteredActions?.length ? (
                <SwipeableContainer rightActions={swipeActions}>
                    <View>{innerContent}</View>
                </SwipeableContainer>
            ) : (
                innerContent
            )}
        </View>
    );
};

const createStyles = (
    { styles: { listItem }, theme }: ThemedStyles,
    { variant }: Required<Pick<ListItemProps, "variant">>,
) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.color.background,
            borderRadius:
                variant === "compact" ? undefined : listItem.borderRadius,
            overflow: "hidden",
            width: "100%",
        },
        pressableContainer: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.color.foreground,
            borderRadius:
                variant === "compact" ? undefined : listItem.borderRadius,
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
            padding: listItem.internalSpacing,
        },
    });

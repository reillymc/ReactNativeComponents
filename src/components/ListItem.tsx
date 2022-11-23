import React from "react";
import { View, StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";

import { Undefined } from "../helpers";
import { ThemedStyles, useThemedStyles } from "../hooks";
import { SwipeView, SwipeViewProps } from "./swipeView";
import { Text } from "./Text";

export interface ListItemStyles {
    spacingMargin: number;
    internalSpacing: number;
    borderRadius: number;
    contentItemTopMargin: number;
    contentItemSpacing: number;
}

export interface ListItemProps {
    heading?: string;
    avatar?: React.ReactNode;

    /**
     * Supports:
     * - `<ListItemRow/>`
     * - `<ListItemRow/>[]`
     */
    contentRows?: Array<React.ReactNode>;

    swipeActions?: SwipeViewProps["rightActions"];
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({
    avatar,
    heading,
    contentRows = [],
    swipeActions,
    style,
    onPress,
}) => {
    const filteredRows = contentRows.filter(Undefined);

    const styles = useThemedStyles(createStyles, { avatar, contentRows: filteredRows });

    return (
        <View style={styles.container}>
            <SwipeView rightActions={swipeActions}>
                <Pressable onPress={onPress} style={[styles.innerContainer, style]}>
                    {!!avatar && <View style={styles.avatar}>{avatar}</View>}
                    <View style={styles.contentContainer}>
                        {!!heading && <Text variant="heading">{heading}</Text>}
                        {filteredRows}
                    </View>
                </Pressable>
            </SwipeView>
        </View>
    );
};

ListItem.displayName = "ListItem";

const createStyles = (
    { styles: { listItem }, theme }: ThemedStyles,
    { avatar, contentRows = [] }: Partial<ListItemProps>,
) => {
    const rowWidthValue = (contentRows.length + 1) * 4;

    return StyleSheet.create({
        container: {
            marginBottom: listItem.spacingMargin,
            width: "100%",
            backgroundColor: theme.color.foreground,
            borderRadius: listItem.borderRadius,
            overflow: "hidden",
        },
        innerContainer: {
            flexDirection: "row",
            backgroundColor: theme.color.foreground,
        },
        avatar: {
            marginLeft: listItem.internalSpacing,
            marginRight: listItem.internalSpacing / 2,
            width: `${rowWidthValue}%`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        contentContainer: {
            flexDirection: "column",
            alignItems: "flex-start",
            paddingVertical: listItem.internalSpacing,
            paddingLeft: avatar ? 0 : listItem.internalSpacing,
        },
        row: {
            marginTop: listItem.contentItemTopMargin,
        },
        spacer: {
            marginHorizontal: listItem.contentItemSpacing,
        },
        contentItem: {
            flexDirection: "row",
        },
    });
};

export interface ListItemRowProps {
    contentItems?: Array<React.ReactNode> | React.ReactNode;
}

export const ListItemRow: React.FC<ListItemRowProps> = ({ contentItems }) => {
    const styles = useThemedStyles(createStyles, {});

    const items = Array.isArray(contentItems) ? contentItems : [contentItems];
    return (
        <View style={styles.contentItem}>
            {items.map((item, index) => (
                <View key={index} style={styles.contentItem}>
                    {item}
                    {index < items.length - 1 && <Text style={styles.spacer}>·</Text>}
                </View>
            ))}
        </View>
    );
};

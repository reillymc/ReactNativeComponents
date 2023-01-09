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
    header?: React.ReactNode;
    avatar?: React.ReactNode;
    alert?: React.ReactNode;

    /**
     * Supports:
     * - `<ListItemRow/>`
     * - `<ListItemRow/>[]`
     */
    contentRows?: Array<React.ReactNode>;

    footer?: React.ReactNode;

    swipeActions?: SwipeViewProps["rightActions"];
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({
    avatar,
    alert,
    heading,
    footer,
    header,
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
                <Pressable onPress={onPress} style={[styles.pressableContainer, style]}>
                    {header}
                    <View style={styles.innerContainer}>
                        {!!avatar && <View style={styles.avatarContainer}>{avatar}</View>}
                        <View style={styles.contentContainer}>
                            {!!heading && (
                                <Text variant="heading" numberOfLines={2}>
                                    {heading}
                                </Text>
                            )}
                            {filteredRows}
                        </View>
                        {!!alert && <View style={styles.avatarContainer}>{alert}</View>}
                    </View>
                    {footer}
                </Pressable>
            </SwipeView>
        </View>
    );
};

ListItem.displayName = "ListItem";

const createStyles = ({ styles: { listItem }, theme }: ThemedStyles, { avatar }: Partial<ListItemProps>) =>
    StyleSheet.create({
        container: {
            marginBottom: listItem.spacingMargin,
            width: "100%",
            backgroundColor: theme.color.foreground,
            borderRadius: listItem.borderRadius,
            overflow: "hidden",
        },
        pressableContainer: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.color.foreground,
        },
        innerContainer: {
            flexDirection: "row",
        },
        avatarContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        avatar: {
            marginLeft: listItem.internalSpacing,
            marginRight: listItem.internalSpacing / 2,
        },
        alert: {
            marginLeft: listItem.internalSpacing / 2,
            marginRight: listItem.internalSpacing,
        },
        contentContainer: {
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            paddingVertical: listItem.internalSpacing,
            paddingLeft: avatar ? 0 : listItem.internalSpacing,
            paddingRight: listItem.internalSpacing,
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
        footer: {
            display: "flex",
            marginBottom: listItem.internalSpacing,
            marginLeft: listItem.internalSpacing,
            marginRight: listItem.internalSpacing,
        },
    });

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

export interface ListItemAvatarProps {
    children?: React.ReactNode;
}

export const ListItemAvatar: React.FC<ListItemAvatarProps> = ({ children }) => {
    const styles = useThemedStyles(createStyles, {});

    return <View style={styles.avatar}>{children}</View>;
};

export interface ListItemAlertProps {
    children?: React.ReactNode;
}

export const ListItemAlert: React.FC<ListItemAlertProps> = ({ children }) => {
    const styles = useThemedStyles(createStyles, {});

    return <View style={styles.alert}>{children}</View>;
};

export interface ListItemFooterProps {
    children?: React.ReactNode;
}

export const ListItemFooter: React.FC<ListItemFooterProps> = ({ children }) => {
    const styles = useThemedStyles(createStyles, {});

    return <View style={styles.footer}>{children}</View>;
};

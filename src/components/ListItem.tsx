import type { FC, ReactElement, ReactNode } from "react";
import {
    Pressable,
    type StyleProp,
    StyleSheet,
    View,
    type ViewStyle,
} from "react-native";
import { Undefined } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../hooks";
import { SwipeableContainer, type SwipeableContainerProps } from "./container";
import { Text } from "./text";

type ListItemVariant = "default" | "compact";

export interface ListItemStyles {
    spacingMargin: number;
    internalSpacing: number;
    borderRadius: number;
    contentItemTopMargin: number;
    contentItemSpacing: number;
}

export interface ListItemProps {
    heading?: string;
    header?: ReactNode;
    avatar?: ReactNode;
    alert?: ReactNode;
    variant?: ListItemVariant;

    /**
     * Supports:
     * - `<ListItemRow/>`
     * - `<ListItemRow/>[]`
     */
    contentRows?: Array<ReactNode>;

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
    variant,
    contentRows = [],
    swipeActions,
    style,
    contentContainerStyle,
    onPress,
}) => {
    const filteredRows = contentRows.filter(Undefined);

    const filteredActions = swipeActions?.filter(Undefined);

    const styles = useThemedStyles(createStyles, { avatar, variant });

    const innerContent = (
        <Pressable onPress={onPress} style={[styles.pressableContainer, style]}>
            {header}
            <View style={styles.bodyContainer}>
                <View style={styles.innerContainer}>
                    {!!avatar && (
                        <View style={styles.avatarContainer}>{avatar}</View>
                    )}
                    <View
                        style={[styles.contentContainer, contentContainerStyle]}
                    >
                        {!!heading && (
                            <Text variant="heading" numberOfLines={2}>
                                {heading}
                            </Text>
                        )}
                        {filteredRows}
                    </View>
                </View>
                {!!alert && <View style={styles.avatarContainer}>{alert}</View>}
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

ListItem.displayName = "ListItem";

const createStyles = (
    { styles: { listItem }, theme }: ThemedStyles,
    { avatar, variant }: Partial<ListItemProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            marginBottom:
                variant === "compact" ? undefined : listItem.spacingMargin,
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
        avatarContainer: {
            alignItems: "center",
            justifyContent: "center",
        },
        avatar: {
            marginLeft: listItem.internalSpacing,
            marginRight: listItem.spacingMargin,
        },
        alert: {
            marginLeft: listItem.spacingMargin,
            marginRight: listItem.internalSpacing,
        },
        contentContainer: {
            flexShrink: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            paddingVertical: listItem.internalSpacing,
            paddingLeft: avatar ? 0 : listItem.internalSpacing,
            paddingRight: listItem.internalSpacing,
        },
        spacer: {
            marginHorizontal: listItem.contentItemSpacing,
        },
        contentItem: {
            flexDirection: "row",
            flexShrink: 1,
        },
        footer: {
            display: "flex",
            marginBottom: listItem.internalSpacing,
            marginLeft: listItem.internalSpacing,
            marginRight: listItem.internalSpacing,
        },
    });
    return styles;
};

export interface ListItemRowProps {
    contentItems?: Array<ReactElement> | ReactElement;
}

export const ListItemRow: FC<ListItemRowProps> = ({ contentItems }) => {
    const styles = useThemedStyles(createStyles, {});

    const items = Array.isArray(contentItems) ? contentItems : [contentItems];

    return (
        <View style={styles.contentItem}>
            {items.map((item, index) => (
                <View key={item?.key} style={styles.contentItem}>
                    {item}
                    {index < items.length - 1 && (
                        <Text style={styles.spacer}>·</Text>
                    )}
                </View>
            ))}
        </View>
    );
};

export interface ListItemAvatarProps {
    children?: ReactNode;
}

export const ListItemAvatar: FC<ListItemAvatarProps> = ({ children }) => {
    const styles = useThemedStyles(createStyles, {});

    return <View style={styles.avatar}>{children}</View>;
};

export interface ListItemAlertProps {
    children?: ReactNode;
}

export const ListItemAlert: FC<ListItemAlertProps> = ({ children }) => {
    const styles = useThemedStyles(createStyles, {});

    return <View style={styles.alert}>{children}</View>;
};

export interface ListItemFooterProps {
    children?: ReactNode;
}

export const ListItemFooter: FC<ListItemFooterProps> = ({ children }) => {
    const styles = useThemedStyles(createStyles, {});

    return <View style={styles.footer}>{children}</View>;
};

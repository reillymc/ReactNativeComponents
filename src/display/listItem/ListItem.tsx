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
    spacingMargin: number;
    internalSpacing: number;
    borderRadius: number;
    backgroundColor: ColorValue;
    surfaceColor: ColorValue;
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

    const { styles } = useComponent("listItem", {
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
                            <Text variant="heading" numberOfLines={2}>
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
            {!!footer && <View style={styles.footer}>{footer}</View>}
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
        avatar: {
            alignItems: "center",
            justifyContent: "center",
            marginStart: theme.internalSpacing,
        },
        contentContainer: {
            flexShrink: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            padding: theme.internalSpacing,
        },
        alert: {
            alignItems: "center",
            justifyContent: "center",
            marginStart: theme.spacingMargin,
            marginEnd: theme.internalSpacing,
        },
        footer: {
            marginBottom: theme.internalSpacing,
            marginStart: theme.internalSpacing,
            marginEnd: theme.internalSpacing,
        },
    }),
);

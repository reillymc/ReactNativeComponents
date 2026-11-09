import type { FC, ReactNode } from "react";
import {
    type ColorValue,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { type DeepPartial, Undefined } from "@reillymc/es-utils";

import { ActionBase, type ActionBaseProps } from "../../actions";
import { defineStyles, type PropFilter, useComponent } from "../../internal";
import {
    ContextContainer,
    type ContextContainerProps,
    type ContextSwipeState,
} from "../../layout";
import { Text } from "../../typography";

type ListItemCorners = "rounded" | "square";

export interface ListItemTheme {
    surface: {
        backgroundColor: ColorValue;
        borderRadius: number;
        paddingTop: number;
        paddingBottom: number;
        paddingStart: number;
        paddingEnd: number;
    };
    swipeActions: {
        margin: number;
        gap: number;
    };
    internalGap: number;
    textColor: ColorValue;
}

export interface ListItemProps
    extends Pick<
        ActionBaseProps,
        | "onPress"
        | "role"
        | "accessibilityRole"
        | "accessibilityLabel"
        | "href"
        | "rel"
        | "target"
        | "download"
    > {
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

    /**
     * Corner treatment for the item surface.
     * @default "rounded"
     */
    corners?: ListItemCorners;

    /**
     * Main content, typically one or more `ContentRow` elements.
     */
    content?: ReactNode;

    /**
     * Content rendered below the body.
     */
    footer?: ReactNode;

    actions?: ContextContainerProps["actions"];
    style?: StyleProp<ViewStyle>;
    theme?: DeepPartial<ListItemTheme>;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export const ListItem: FC<ListItemProps> = ({
    avatar,
    alert,
    heading,
    footer,
    header,
    corners = "rounded",
    content,
    actions,
    style,
    theme: themeOverrides,
    contentContainerStyle,
    onPress,
    ...props
}) => {
    const filteredActions = actions?.filter(Undefined);
    const swipeState = useSharedValue<ContextSwipeState>("closed");

    const { styles, theme } = useComponent("listItem", {
        themeOverrides,
        props: { corners },
        createStyles,
    });

    const animatedSurfaceStyle = useAnimatedStyle(() => {
        if (corners === "rounded") {
            return { borderRadius: theme.surface.borderRadius };
        }

        return {
            borderRadius: withTiming(
                swipeState.value === "opening" || swipeState.value === "open"
                    ? theme.surface.borderRadius
                    : 0,
                { duration: 150 },
            ),
        };
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

    const surface = (
        <Animated.View style={[styles.surface, animatedSurfaceStyle]}>
            {onPress || props.href != null ? (
                <ActionBase
                    {...props}
                    hitSlop={0}
                    onPress={
                        onPress
                            ? (event) => {
                                  if (swipeState.value === "closed") {
                                      onPress(event);
                                  } else if (props.href != null) {
                                      event.preventDefault();
                                  }
                              }
                            : undefined
                    }
                    style={[styles.pressableContainer, style]}
                >
                    {listContent}
                </ActionBase>
            ) : (
                <View style={[styles.pressableContainer, style]}>
                    {listContent}
                </View>
            )}
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            {filteredActions?.length ? (
                <ContextContainer
                    actions={filteredActions}
                    actionsContainerStyle={styles.swipeActions}
                    onSwipeStateChange={(state) => {
                        swipeState.value = state;
                    }}
                >
                    {surface}
                </ContextContainer>
            ) : (
                surface
            )}
        </View>
    );
};

const createStyles = defineStyles(
    (theme: ListItemTheme, props: PropFilter<ListItemProps, "corners">) => ({
        container: {
            width: "100%",
        },
        surface: {
            backgroundColor: theme.surface.backgroundColor,
        },
        swipeActions: {
            margin: theme.swipeActions.margin,
            marginLeft: theme.swipeActions.gap,
            gap: theme.swipeActions.gap,
        },
        pressableContainer: {
            display: "flex",
            flexDirection: "column",
            borderRadius:
                props.corners === "square" ? 0 : theme.surface.borderRadius,
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

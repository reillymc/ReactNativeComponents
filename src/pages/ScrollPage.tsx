import React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Text, NavigationHeaderProps } from "../components";

interface ScrollPageProps extends ScrollViewProps {
    /**
     * Supports:
     * - `<NavigationHeader/>` component
     */
    heading: React.ReactElement<NavigationHeaderProps>;

    /**
     * Supports:
     * `<ModalSheet/>` component.
     */
    modal?: React.ReactNode;
}

const ScrollPage: React.FC<ScrollPageProps> = ({
    heading,
    modal,
    contentContainerStyle,
    children,
    onScroll,
    ...scrollViewProps
}) => {
    const navigation = useNavigation();

    const [scrollPosition, setScrollPosition] = React.useState(0);

    const navigationHeader = React.useMemo(
        () => React.cloneElement(heading, { ...heading.props, scrollPosition }),
        [heading, scrollPosition],
    );

    React.useLayoutEffect(() => {
        if (navigation && heading) {
            navigation.setOptions({
                headerTransparent: true,
                headerShown: true,
                header: () => navigationHeader,
            });
        } else {
            console.warn("ScrollPage: navigation is not defined");
        }
    }, [heading, navigation, navigationHeader]);
    return (
        <>
            <ScrollView
                {...scrollViewProps}
                scrollIndicatorInsets={scrollViewProps.scrollIndicatorInsets ?? { top: 38 }}
                contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
                onScroll={e => {
                    onScroll?.(e);
                    setScrollPosition(e.nativeEvent.contentOffset.y);
                }}
                scrollEventThrottle={24}
            >
                <Text variant="display">{heading.props.heading}</Text>
                {children}
            </ScrollView>
            {modal}
        </>
    );
};

export { ScrollPage };

const styles = StyleSheet.create({
    contentContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 120,
    },
});

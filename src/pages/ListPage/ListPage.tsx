import React from "react";
import { FlatListProps, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

import { ScreenHeading } from "./ScreenHeading";
import { NavigationHeader, NavigationHeaderProps } from "./NavigationHeader";

interface ListPageProps<T>
    extends Omit<FlatListProps<T>, "ListHeaderComponent">,
        Omit<NavigationHeaderProps, "scrollPosition" | "onScroll"> {
    /**
     * <ModalSheet/> component.
     */
    modal?: React.ReactNode;
}

const ListPage = <T extends any>({ heading, leftItem, rightItem, modal, ...flatListProps }: ListPageProps<T>) => {
    const navigation = useNavigation();

    const [scrollPosition, setScrollPosition] = React.useState(0);

    const navigationHeader = React.useMemo(
        () => (
            <NavigationHeader
                heading={heading}
                scrollPosition={scrollPosition}
                leftItem={leftItem}
                rightItem={rightItem}
            />
        ),
        [heading, leftItem, rightItem, scrollPosition]
    );

    React.useLayoutEffect(() => {
        if (navigation) {
            navigation.setOptions({
                headerTransparent: true,
                header: () => navigationHeader,
            });
        } else {
            console.warn("ListPage: navigation is not defined");
        }
    }, [navigation, navigationHeader]);
    return (
        <>
            <FlatList
                {...flatListProps}
                style={styles.listContainer}
                ListHeaderComponentStyle={styles.listHeader}
                ListHeaderComponent={<ScreenHeading heading={heading} />}
                onScroll={e => setScrollPosition(e.nativeEvent.contentOffset.y)}
            />
            {modal}
        </>
    );
};

export { ListPage };

const styles = StyleSheet.create({
    listContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 120,
    },
    listHeader: {
        paddingBottom: 12,
    },
});

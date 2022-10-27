import React from "react";
import { FlatListProps, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

import { Text, NavigationHeaderProps } from "../../components";

interface ListPageProps<T> extends Omit<FlatListProps<T>, "ListHeaderComponent"> {
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

const ListPage = <T extends any>({ heading, modal, contentContainerStyle, ...flatListProps }: ListPageProps<T>) => {
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
            console.warn("ListPage: navigation is not defined");
        }
    }, [navigation, navigationHeader]);
    return (
        <>
            <FlatList
                {...flatListProps}
                style={styles.list}
                contentContainerStyle={[styles.listContentContainer, contentContainerStyle]}
                ListHeaderComponentStyle={styles.listHeader}
                ListHeaderComponent={<Text variant="title">{heading.props.heading}</Text>}
                onScroll={e => setScrollPosition(e.nativeEvent.contentOffset.y)}
            />
            {modal}
        </>
    );
};

export { ListPage };

const styles = StyleSheet.create({
    list: {},
    listHeader: {
        paddingBottom: 12,
    },
    listContentContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 120,
    },
});

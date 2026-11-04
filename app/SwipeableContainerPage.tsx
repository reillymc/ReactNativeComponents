import { View } from "react-native";
import Octicons from "@react-native-vector-icons/octicons";
import { SwipeAction } from "@reillymc/react-native-components/actions";
import { SwipeableContainer } from "@reillymc/react-native-components/layout";
import { usePalette } from "@reillymc/react-native-components/theme";
import { Text } from "@reillymc/react-native-components/typography";

import { ComponentPage } from "../demo/components";

const SwipeableContainerPage = () => {
    const palette = usePalette();

    return (
        <ComponentPage
            componentName="Swipeable Container"
            component={
                <View style={{ width: "100%", gap: 12 }}>
                    <Text variant="caption">
                        Swipe the row left to reveal actions.
                    </Text>
                    <SwipeableContainer
                        rightActions={[
                            <SwipeAction
                                key="edit"
                                iconSet={Octicons}
                                iconName="pencil"
                                variant="primary"
                                onPress={() => null}
                            />,
                            <SwipeAction
                                key="delete"
                                iconSet={Octicons}
                                iconName="trash"
                                variant="destructive"
                                onPress={() => null}
                            />,
                        ]}
                    >
                        <View
                            style={{
                                backgroundColor: palette.color.inset,
                                padding: 16,
                            }}
                        >
                            <Text>Swipeable row</Text>
                        </View>
                    </SwipeableContainer>
                </View>
            }
        />
    );
};

export default SwipeableContainerPage;

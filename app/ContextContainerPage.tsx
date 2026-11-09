import { View } from "react-native";
import Octicons from "@react-native-vector-icons/octicons";
import { ContextAction } from "@reillymc/react-native-components/actions";
import { ContextContainer } from "@reillymc/react-native-components/layout";
import { usePalette } from "@reillymc/react-native-components/theme";
import { Text } from "@reillymc/react-native-components/typography";

import { ComponentPage } from "../demo/components";

const ContextContainerPage = () => {
    const palette = usePalette();

    return (
        <ComponentPage
            componentName="Context Container"
            component={
                <View style={{ width: "100%", gap: 12 }}>
                    <Text variant="caption">
                        Swipe the row left on mobile. Right-click or press
                        Shift+F10 on web.
                    </Text>
                    <ContextContainer
                        actions={[
                            <ContextAction
                                key="edit"
                                label="Edit"
                                iconSet={Octicons}
                                iconName="pencil"
                                variant="primary"
                                onPress={() => null}
                            />,
                            <ContextAction
                                key="delete"
                                label="Delete"
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
                            <Text>Context row</Text>
                        </View>
                    </ContextContainer>
                </View>
            }
        />
    );
};

export default ContextContainerPage;

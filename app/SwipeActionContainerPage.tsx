import Octicons from "@react-native-vector-icons/octicons";
import { SwipeAction } from "@reillymc/react-native-components/actions";
import { ContentRow } from "@reillymc/react-native-components/display";
import { SwipeActionContainer } from "@reillymc/react-native-components/layout";
import { usePalette } from "@reillymc/react-native-components/theme";
import { Text } from "@reillymc/react-native-components/typography";

import { ComponentPage } from "../demo/components";

const SwipeActionContainerPage = () => {
    const palette = usePalette();

    return (
        <ComponentPage
            componentName="Swipe Action Container"
            component={
                <SwipeActionContainer
                    actions={[
                        <SwipeAction
                            key="edit"
                            label="Edit"
                            iconSet={Octicons}
                            iconName="pencil"
                            onPress={() => null}
                        />,
                        <SwipeAction
                            key="delete"
                            label="Delete"
                            iconSet={Octicons}
                            iconName="trash"
                            onPress={() => null}
                        />,
                    ]}
                    actionsContainerStyle={{
                        gap: palette.spacing.tiny,
                    }}
                >
                    <ContentRow
                        style={{
                            padding: palette.spacing.large,
                            backgroundColor: palette.color.elevated,
                            width: "150",
                        }}
                    >
                        <Text>Swipe row</Text>
                    </ContentRow>
                </SwipeActionContainer>
            }
        />
    );
};

export default SwipeActionContainerPage;

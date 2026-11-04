import { View } from "react-native";
import Octicons from "@react-native-vector-icons/octicons";
import { SwipeAction } from "@reillymc/react-native-components/actions";

import { ComponentPage } from "../demo/components";

const SwipeActionPage = () => (
    <ComponentPage
        componentName="Swipe Action"
        component={
            <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ height: 56 }}>
                    <SwipeAction
                        iconSet={Octicons}
                        iconName="pencil"
                        variant="primary"
                        onPress={() => null}
                    />
                </View>
                <View style={{ height: 56 }}>
                    <SwipeAction
                        iconSet={Octicons}
                        iconName="trash"
                        variant="destructive"
                        onPress={() => null}
                    />
                </View>
            </View>
        }
    />
);

export default SwipeActionPage;

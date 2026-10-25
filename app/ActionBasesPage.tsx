import { View } from "react-native";
import Octicons from "@react-native-vector-icons/octicons";
import {
    ActionBase,
    ButtonBase,
    IconActionBase,
    IconButtonBase,
} from "@reillymc/react-native-components/actions";
import { Text } from "@reillymc/react-native-components/typography";

import { ComponentPage } from "../demo/components";

const ActionBasesPage = () => (
    <ComponentPage
        componentName="Action Bases"
        component={
            <View style={{ alignItems: "center", gap: 10 }}>
                <Text variant="label">ActionBase</Text>
                <ActionBase onPress={() => null}>
                    <Text>Action Base</Text>
                </ActionBase>
                <Text variant="label">ButtonBase</Text>
                <ButtonBase onPress={() => null}>
                    <Text>Button Base</Text>
                </ButtonBase>
                <Text variant="label">IconActionBase</Text>
                <IconActionBase
                    iconSet={Octicons}
                    iconName="star"
                    label="Icon Action Base"
                    onPress={() => null}
                />
                <Text variant="label">IconButtonBase</Text>
                <IconButtonBase
                    iconSet={Octicons}
                    iconName="star"
                    onPress={() => null}
                />
            </View>
        }
    />
);

export default ActionBasesPage;

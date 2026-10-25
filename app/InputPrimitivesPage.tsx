import { View } from "react-native";
import {
    InputBase,
    InputScaffold,
} from "@reillymc/react-native-components/forms";
import { Text } from "@reillymc/react-native-components/typography";

import { ComponentPage } from "../demo/components";

const InputPrimitivesPage = () => (
    <ComponentPage
        componentName="Input Primitives"
        component={
            <View style={{ gap: 16, width: "100%" }}>
                <View style={{ gap: 4 }}>
                    <Text variant="label">InputBase</Text>
                    <InputBase placeholder="Input base" />
                </View>
                <View style={{ gap: 4 }}>
                    <Text variant="label">InputScaffold</Text>
                    <InputScaffold
                        label="Field label"
                        helpText="Supporting help text"
                    >
                        <InputBase placeholder="Nested input" />
                    </InputScaffold>
                </View>
                <InputScaffold
                    label="Error state"
                    helpText="Something went wrong"
                    hasError
                    mandatory
                >
                    <InputBase placeholder="Invalid value" />
                </InputScaffold>
            </View>
        }
    />
);

export default InputPrimitivesPage;

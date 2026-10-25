import { View } from "react-native";
import {
    Icon,
    type UiIconName,
    UiIcons,
} from "@reillymc/react-native-components/icons";
import { Text } from "@reillymc/react-native-components/typography";

import { ComponentPage } from "../demo/components";

const iconNames: Array<UiIconName> = [
    "exclamation",
    "dash",
    "plus",
    "infinity",
    "number",
    "arrow-both",
    "chevron-down",
    "clock",
    "circle",
    "star-empty",
    "star-half",
    "star-full",
];

const UiIconsPage = () => (
    <ComponentPage
        componentName="Built-in Icons"
        component={
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 16,
                    justifyContent: "center",
                }}
            >
                {iconNames.map((iconName) => (
                    <View
                        key={iconName}
                        style={{ alignItems: "center", gap: 4, width: 72 }}
                    >
                        <Icon iconSet={UiIcons} iconName={iconName} />
                        <Text variant="caption">{iconName}</Text>
                    </View>
                ))}
            </View>
        }
    />
);

export default UiIconsPage;

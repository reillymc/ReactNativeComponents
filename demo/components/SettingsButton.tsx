import { Platform } from "react-native";
import { useRouter } from "expo-router";
import Octicons from "@react-native-vector-icons/octicons";
import { IconAction } from "@reillymc/react-native-components/actions";
import { usePalette } from "@reillymc/react-native-components/theme";

export const SettingsButton = () => {
    const router = useRouter();
    const palette = usePalette();

    return (
        <IconAction
            iconSet={Octicons}
            iconName="gear"
            accessibilityLabel="Settings"
            style={{
                marginEnd:
                    Platform.OS === "web" ? palette.spacing.medium : undefined,
            }}
            onPress={() => router.push("/SettingsModal")}
        />
    );
};

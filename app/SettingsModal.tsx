import { Platform, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Action } from "@reillymc/react-native-components/actions";
import {
    SelectionInput,
    ToggleInput,
    type ValueItem,
} from "@reillymc/react-native-components/forms";

import {
    type AppearancePreference,
    useComponentPageSettings,
    useSelectionModal,
} from "../demo/components";
import { defineStyles, useStyles } from "../demo/theme";

const APPEARANCE_ITEMS: ValueItem<AppearancePreference>[] = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
];

const SettingsModal = () => {
    const router = useRouter();
    const styles = useStyles(createStyles);
    const { openSelectionModal } = useSelectionModal();
    const {
        appearance,
        setAppearance,
        surfaceBackground,
        setSurfaceBackground,
    } = useComponentPageSettings();

    const selectedAppearance = APPEARANCE_ITEMS.find(
        (item) => item.value === appearance,
    );

    const handleSelectAppearance = () => {
        openSelectionModal<AppearancePreference>({
            key: "appearance",
            items: APPEARANCE_ITEMS,
            selectionMode: "single",
            label: "Appearance",
            selection: selectedAppearance ? [selectedAppearance] : [],
            onSelect: (items) => {
                const nextAppearance = items[0]?.value;
                if (nextAppearance) {
                    setAppearance(nextAppearance);
                }
            },
        });
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Settings",
                    headerLargeTitle: false,
                    headerRight: () => (
                        <Action
                            label="Done"
                            style={styles.headerAction}
                            onPress={() => router.back()}
                        />
                    ),
                    // biome-ignore lint/style/useNamingConvention: Expo Router native header items API.
                    unstable_headerRightItems: () => [
                        {
                            type: "button",
                            label: "Done",
                            icon: { type: "sfSymbol", name: "checkmark" },
                            onPress: router.back,
                        },
                    ],
                }}
            />
            <ScrollView
                style={styles.screen}
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={styles.content}
            >
                <SelectionInput
                    label="Appearance"
                    selectionMode="single"
                    selection={selectedAppearance}
                    placeholder="Select appearance"
                    onAdd={handleSelectAppearance}
                />
                <ToggleInput
                    label="Component display surface"
                    value={surfaceBackground}
                    onChange={setSurfaceBackground}
                    help="Show/hide the surface color behind the component"
                />
            </ScrollView>
        </>
    );
};

export default SettingsModal;

const createStyles = defineStyles(({ palette, appTheme }) => ({
    screen: {
        flex: 1,
        backgroundColor: appTheme.page.backgroundColor,
    },
    content: {
        paddingHorizontal: appTheme.page.horizontal,
        paddingTop: palette.spacing.medium,
        paddingBottom: appTheme.page.bottom,
        gap: palette.spacing.large,
    },
    section: {
        gap: palette.spacing.small,
    },
    headerAction: {
        marginEnd: Platform.OS === "web" ? palette.spacing.medium : undefined,
    },
}));

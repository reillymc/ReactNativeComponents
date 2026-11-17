import Octicons from "@react-native-vector-icons/octicons";
import {
    ContextMenu,
    ContextMenuItem,
} from "@reillymc/react-native-components/overlays";
import { Text } from "@reillymc/react-native-components/typography";

import { ComponentPage } from "../demo/components";

const actions = [
    { key: "edit", label: "Edit" },
    { key: "delete", label: "Delete" },
] as const;

const icons = {
    edit: { iconSet: Octicons, iconName: "pencil" },
    delete: { iconSet: Octicons, iconName: "trash" },
} as const;

const ContextMenuPage = () => (
    <ComponentPage
        componentName="Context Menu"
        component={
            <ContextMenu
                actions={actions}
                onActionPress={() => null}
                renderItem={(action) => (
                    <ContextMenuItem
                        label={action.label}
                        {...icons[action.key]}
                    />
                )}
                tabIndex={0}
            >
                <Text>Right click me</Text>
            </ContextMenu>
        }
    />
);

export default ContextMenuPage;

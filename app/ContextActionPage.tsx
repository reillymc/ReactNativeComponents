import { type FunctionComponent, useState } from "react";
import { View } from "react-native";
import {
    Octicons,
    type OcticonsIconName,
} from "@react-native-vector-icons/octicons";
import {
    ContextAction,
    type ContextActionProps,
} from "@reillymc/react-native-components/actions";
import type { IconComponentProps } from "@reillymc/react-native-components/icons";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { IconPropDefinitions } from "../demo/helpers";

type Props = IconComponentProps<OcticonsIconName> & ContextActionProps;

const defaultProps: Props = {
    label: "Edit",
    iconSet: Octicons,
    iconName: "pencil",
    variant: "primary",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<Props> = {
    label: {
        type: "string",
        label: "Label",
    },
    iconName: IconPropDefinitions.iconName,
    iconSet: IconPropDefinitions.iconSet,
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Primary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Destructive", value: "destructive" },
        ],
    },
    appearance: {
        type: "enum",
        label: "Appearance",
        values: [
            { id: "auto", label: "Auto", value: undefined },
            { label: "Prominent", value: "prominent" },
            { label: "Subtle", value: "subtle" },
        ],
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    onPress: {
        type: "function",
        label: "Press action",
    },
};

const ContextActionPage: FunctionComponent = () => {
    const [props, setProps] = useState<Props>(defaultProps);

    return (
        <ComponentPage
            componentName="Context Action"
            component={
                <View style={{ height: 72 }}>
                    <ContextAction {...props} />
                </View>
            }
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={(propId, value) =>
                        setProps((prev) => ({ ...prev, [propId]: value }))
                    }
                />
            }
        />
    );
};

export default ContextActionPage;

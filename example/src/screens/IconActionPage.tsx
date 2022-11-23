import React from "react";
import { IconAction, IconActionProps } from "@reillymc/react-native-components";

import { ComponentPage } from "../components";
import { PropDefinitions, PropsPanel } from "../components/PropsPanel";
import { AntDesign } from "@expo/vector-icons";

const defaultProps: IconActionProps = {
    label: "Secondary IconAction",
    iconName: "downcircle",
    variant: "secondary",
    size: "regular",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<IconActionProps> = {
    label: {
        type: "string",
        label: "Label",
    },
    iconName: {
        type: "enum",
        label: "Icon Name",
        values: Object.keys(AntDesign.glyphMap).map((name: any) => ({ label: name, value: name })),
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Secondary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Flat", value: "flat" },
        ],
    },
    size: {
        type: "enum",
        label: "Size",
        values: [
            { label: "Small", value: "small" },
            { label: "Regular", value: "regular" },
            { label: "Large", value: "large" },
        ],
    },
    onPress: {
        type: "function",
        label: "Press action",
    },
};

export const IconActionPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<IconActionProps>(defaultProps);

    return (
        <ComponentPage
            componentName="IconAction"
            component={<IconAction {...props} />}
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={(propId, value) => setProps(prev => ({ ...prev, [propId]: value }))}
                />
            }
        />
    );
};

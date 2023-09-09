import React from "react";
import { IconButton, IconButtonProps } from "@reillymc/react-native-components";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";
import { glyphMapValueItemsOcticons } from "../helpers";

const defaultProps: IconButtonProps = {
    iconName: "arrow-both",
    variant: "primary",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<IconButtonProps> = {
    iconName: {
        type: "enum",
        label: "Icon Name",
        default: defaultProps.iconName,
        values: glyphMapValueItemsOcticons,
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: defaultProps.variant,
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Flat", value: "flat" },
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

const IconButtonPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<IconButtonProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Icon Button"
            component={<IconButton {...props} />}
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

export default IconButtonPage;

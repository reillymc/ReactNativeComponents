import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Tag, TagProps } from "@reillymc/react-native-components";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";

const defaultProps: TagProps = {
    label: "Example Tag",
    iconName: "closecircleo",
    variant: "dark",
};

const propDefinitions: PropDefinitions<TagProps> = {
    label: {
        type: "string",
        label: "First Name",
    },
    iconName: {
        type: "enum",
        label: "Icon Name",
        default: "closecircleo",
        values: [
            { label: "None", value: undefined },
            ...Object.keys(AntDesign.glyphMap).map((name: any) => ({ label: name, value: name })),
        ],
    },
    variant: {
        type: "enum",
        label: "Variant",
        default: "dark",
        values: [
            { label: "Dark", value: "dark" },
            { label: "Light", value: "light" },
        ],
    },
};

export const TagPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<TagProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Tag"
            component={<Tag {...props} />}
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

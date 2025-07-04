import React from "react";
import { Tag, type TagProps } from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";
import { glyphMapValueItemsNullable } from "../helpers";

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
        values: glyphMapValueItemsNullable,
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

const TagPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<TagProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Tag"
            component={<Tag {...props} />}
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

export default TagPage;

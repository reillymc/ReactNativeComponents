import React from "react";
import Octicons from "@react-native-vector-icons/octicons";
import { Tag, TagIcon, type TagProps } from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";

const defaultProps: TagProps = {
    label: "Example Tag",
    variant: "dark",
    icon: <TagIcon iconSet={Octicons} iconName="x-circle" />,
};

const propDefinitions: PropDefinitions<TagProps> = {
    label: {
        type: "string",
        label: "First Name",
    },
    icon: {
        type: "enum",
        label: "Icon",
        values: [
            {
                id: "none",
                label: "none",
                value: undefined,
            },
            {
                id: "close",
                label: "close",
                value: <TagIcon iconSet={Octicons} iconName="x-circle" />,
            },
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

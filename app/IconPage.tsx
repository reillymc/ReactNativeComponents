/** biome-ignore-all lint/suspicious/noExplicitAny: don't need to worry about type-safe usage here */
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { Icon, type IconProps } from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";
import { glyphMapValueItemsOcticons } from "../helpers";

const defaultProps: IconProps<any, any> = {
    iconName: "arrow-both",
    iconSet: Octicons,
};

const propDefinitions: PropDefinitions<IconProps<any, any>> = {
    iconName: {
        type: "enum",
        label: "Icon Name",
        values: glyphMapValueItemsOcticons,
    },

    iconSet: {
        type: "enum",
        label: "Icon Set",
        values: [
            {
                id: "octicons",
                label: "Octicons",
                value: Octicons,
            },
        ],
    },
};

const IconPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<IconProps<any, any>>(defaultProps);

    return (
        <ComponentPage
            componentName="Icon"
            component={<Icon {...props} />}
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

export default IconPage;

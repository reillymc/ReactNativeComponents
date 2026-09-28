import React from "react";
import {
    Octicons,
    type OcticonsIconName,
} from "@react-native-vector-icons/octicons";
import {
    IconAction,
    type IconActionProps,
    type IconComponentProps,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { glyphMapValueItems } from "../demo/helpers";

type Props = IconComponentProps<OcticonsIconName> & IconActionProps;

const defaultProps: Props = {
    iconSet: Octicons,
    label: "Secondary IconAction",
    iconName: "arrow-both",
    variant: "secondary",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<Props> = {
    label: {
        type: "string",
        label: "Label",
    },
    iconName: {
        type: "enum",
        label: "Icon Name",
        values: glyphMapValueItems,
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Secondary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
        ],
    },
    iconPosition: {
        type: "enum",
        label: "Icon position",
        default: "left",
        values: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
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
    iconSet: {
        type: "hidden",
    },
};

const IconActionPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<Props>(defaultProps);

    return (
        <ComponentPage
            componentName="IconAction"
            component={<IconAction {...props} />}
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

export default IconActionPage;

import { type FunctionComponent, useState } from "react";
import {
    Octicons,
    type OcticonsIconName,
} from "@react-native-vector-icons/octicons";
import {
    IconButton,
    type IconButtonProps,
    type IconComponentProps,
} from "@reillymc/react-native-components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { glyphMapValueItems } from "../demo/helpers";

type Props = IconComponentProps<OcticonsIconName> & IconButtonProps;

const defaultProps: Props = {
    iconSet: Octicons,
    iconName: "arrow-both",
    variant: "primary",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<Props> = {
    iconName: {
        type: "enum",
        label: "Icon Name",
        default: defaultProps.iconName,
        values: glyphMapValueItems,
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: defaultProps.variant,
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Destructive", value: "destructive" },
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

const IconButtonPage: FunctionComponent = () => {
    const [props, setProps] = useState<Props>(defaultProps);

    return (
        <ComponentPage
            componentName="Icon Button"
            component={<IconButton {...props} />}
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

export default IconButtonPage;

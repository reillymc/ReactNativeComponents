import { type FunctionComponent, useState } from "react";
import {
    type IconBaseDefaultProps,
    IconButton,
    type IconButtonProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";
import { glyphMapValueItems } from "../helpers";

type Props = IconBaseDefaultProps & IconButtonProps;

const defaultProps: Props = {
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

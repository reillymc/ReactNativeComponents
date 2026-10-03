import { type FunctionComponent, useState } from "react";
import {
    Button,
    type ButtonProps,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";

const defaultProps: ButtonProps = {
    label: "Primary Button",
    variant: "primary",
    appearance: "subtle",
    width: "auto",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<ButtonProps> = {
    label: {
        type: "string",
        label: "Label",
    },
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
            { label: "Prominent", value: "prominent" },
            { label: "Subtle", value: "subtle" },
        ],
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    width: {
        type: "enum",
        label: "Width",
        values: [
            { label: "Auto", value: "auto" },
            { label: "Medium", value: "medium" },
        ],
    },
    onPress: {
        type: "function",
        label: "Press action",
    },
};

const ButtonPage: FunctionComponent = () => {
    const [props, setProps] = useState<ButtonProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Button"
            component={<Button {...props} />}
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

export default ButtonPage;

import { type FC, useState } from "react";
import { Action, type ActionProps } from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";

const defaultProps: ActionProps = {
    label: "Secondary Action",
    variant: "secondary",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<ActionProps> = {
    label: {
        type: "string",
        label: "Label",
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Secondary",
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

const ActionPage: FC = () => {
    const [props, setProps] = useState<ActionProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Action"
            component={<Action {...props} />}
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

export default ActionPage;

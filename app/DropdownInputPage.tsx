import React from "react";
import {
    DropdownInput,
    type DropdownInputProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";

const propDefinitions: PropDefinitions<DropdownInputProps> = {
    onSelect: {
        type: "function",
        label: "onSelect",
    },
    placeholder: {
        type: "string",
        label: "Placeholder text",
    },
    mandatory: {
        type: "boolean",
        label: "Mandatory",
    },
    label: {
        type: "string",
        label: "Label",
    },
};

const defaultProps: DropdownInputProps = {
    placeholder: "Dropdown Input",
    items: [
        { value: "1", label: "Item 1" },
        {
            value: "2",
            label: "Item 2",
            description: "An item with description",
        },
        { value: "3", label: "Item 3" },
    ],
    onSelect: () => null,
};

const DropdownInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState(defaultProps);

    return (
        <ComponentPage
            componentName="Dropdown Input"
            component={
                <DropdownInput
                    {...props}
                    onSelect={(selectedItem) =>
                        setProps((prev) => ({ ...prev, selectedItem }))
                    }
                />
            }
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

export default DropdownInputPage;

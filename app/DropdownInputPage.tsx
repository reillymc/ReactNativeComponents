import React from "react";
import {
    DropdownInput,
    type DropdownInputProps,
} from "@reillymc/react-native-components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { CommonInputProps } from "../demo/helpers";

const propDefinitions: PropDefinitions<DropdownInputProps> = {
    ...CommonInputProps,
    onSelect: {
        type: "function",
        label: "onSelect",
    },
    selectBehaviour: {
        type: "enum",
        label: "Select Behaviour",
        values: [
            { label: "Blur and Select", value: "blurAndSelect" },
            { label: "Keep Focus", value: "select" },
        ],
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

    console.log(props.selectedValue);

    return (
        <ComponentPage
            componentName="Dropdown Input"
            component={
                <DropdownInput
                    {...props}
                    onSelect={(selection) =>
                        setProps((prev) => ({
                            ...prev,
                            selectedValue: selection?.value,
                        }))
                    }
                    onChangeText={(textValue) =>
                        setProps((prev) => ({ ...prev, textValue }))
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

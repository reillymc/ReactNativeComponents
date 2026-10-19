import { type FunctionComponent, useState } from "react";
import {
    DropdownInput,
    type DropdownInputProps,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { CommonInputProps } from "../demo/helpers";

const propDefinitions: PropDefinitions<DropdownInputProps> = {
    ...CommonInputProps,
    onChange: {
        type: "function",
        label: "onChange",
    },
    openOnFocus: {
        type: "boolean",
        label: "Open on focus",
    },
    allowsCustomValue: {
        type: "boolean",
        label: "Allow custom value",
    },
    blurOnSelect: {
        type: "boolean",
        label: "Blur on select",
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
        { value: "4", label: "Item 4" },
        { value: "5", label: "Item 5" },
        { value: "6", label: "Item 6" },
        { value: "s1", label: "Something Else 1" },
        { value: "s2", label: "Something Else 2" },
        { value: "s3", label: "Something Else 3" },
    ],
    openOnFocus: true,
    allowsCustomValue: false,
    blurOnSelect: true,
};

const DropdownInputPage: FunctionComponent = () => {
    const [props, setProps] = useState(defaultProps);

    return (
        <ComponentPage
            componentName="Dropdown Input"
            component={
                <DropdownInput
                    {...props}
                    onChange={(item) =>
                        setProps((prev) => ({
                            ...prev,
                            value: item?.value,
                        }))
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

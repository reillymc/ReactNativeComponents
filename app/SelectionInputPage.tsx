import { type FunctionComponent, useState } from "react";
import type { ValueItem } from "@reillymc/react-native-components/common";
import {
    SelectionInput,
    type SelectionInputProps,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { CommonInputProps } from "../demo/helpers";

type SelectionInputDemoProps = Pick<
    SelectionInputProps,
    Exclude<keyof SelectionInputProps, "value" | "selectionMode">
> & {
    selectionMode: "single" | "multi";
    value?: ValueItem | Array<ValueItem>;
};

const propDefinitions: PropDefinitions<SelectionInputDemoProps> = {
    ...CommonInputProps,
    selectionMode: {
        type: "enum",
        label: "Selection mode",
        values: [
            { label: "Single", value: "single" },
            { label: "Multi", value: "multi" },
        ],
    },
    onChange: {
        label: "Press action",
        type: "function",
    },
};

const defaultProps: SelectionInputProps = {
    label: "Selection Input",
    disabled: false,
    items: [
        { label: "Item", value: "item1" },
        { label: "Item 2", value: "item2" },
        { label: "Item 3", value: "item3" },
        { label: "Item 4", value: "item4" },
        { label: "Item 5", value: "item5" },
        { label: "Item 6", value: "item6" },
        { label: "Item 7", value: "item7" },
        { label: "Item 8", value: "item8" },
        { label: "Item 9", value: "item9" },
        { label: "Item 10", value: "item10" },
        { label: "Item 11", value: "item11" },
    ],
    placeholder: "Select an item",
    selectionMode: "single",
    value: { label: "Item", value: "item1" },
};

const SelectionInputPage: FunctionComponent = () => {
    const [props, setProps] = useState<SelectionInputProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Selection Input"
            component={
                <SelectionInput
                    {...props}
                    onChange={(next) =>
                        setProps(
                            (prev) =>
                                ({
                                    ...prev,
                                    value: next,
                                }) as SelectionInputProps,
                        )
                    }
                />
            }
            propsPanel={
                <PropsPanel<SelectionInputDemoProps>
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={(propId, value) => {
                        if (propId === "selectionMode") {
                            setProps((prev) => ({
                                ...prev,
                                value: undefined,
                            }));
                        }
                        setProps((prev) => ({ ...prev, [propId]: value }));
                    }}
                />
            }
        />
    );
};

export default SelectionInputPage;

import { type FunctionComponent, useState } from "react";
import {
    SelectionInput,
    type SelectionInputProps,
    type ValueItem,
} from "@reillymc/react-native-components/forms";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
    useSelectionModal,
} from "../demo/components";
import {
    FieldPropDefinitions,
    FieldTextInputPropDefinitions,
} from "../demo/helpers";

type SelectionMode = "single" | "multi";

type SelectionInputDemoProps = Pick<
    SelectionInputProps,
    Exclude<keyof SelectionInputProps, "selection" | "selectionMode">
> & {
    selectionMode: SelectionMode;
    selection?: ValueItem | Array<ValueItem>;
};

const DEMO_ITEMS: ValueItem[] = [
    { label: "Item 1", value: "item1" },
    { label: "Item 2", value: "item2" },
    {
        label: "Item 3",
        value: "item3",
        description: "An item with a description",
    },
    { label: "Item 4", value: "item4" },
    { label: "Item 5", value: "item5" },
    { label: "Item 6", value: "item6" },
    { label: "Item 7", value: "item7" },
    { label: "Item 8", value: "item8" },
    { label: "Item 9", value: "item9" },
];

const DEFAULT_SELECTION = DEMO_ITEMS[0] as ValueItem;

const getItemKey = (item: ValueItem) => ("id" in item ? item.id : item.value);

const normalizeSelection = (
    selectionMode: SelectionMode,
    selection: SelectionInputProps["selection"],
) => {
    if (selectionMode === "multi") {
        if (Array.isArray(selection)) return selection;
        return selection ? [selection] : [];
    }

    return Array.isArray(selection) ? selection[0] : selection;
};

const propDefinitions: PropDefinitions<SelectionInputDemoProps> = {
    label: FieldPropDefinitions.label,
    hideLabel: FieldPropDefinitions.hideLabel,
    help: FieldPropDefinitions.help,
    error: FieldPropDefinitions.error,
    required: FieldPropDefinitions.required,
    variant: FieldPropDefinitions.variant,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
    placeholder: FieldTextInputPropDefinitions.placeholder,
    selectionMode: {
        type: "enum",
        label: "Selection mode",
        values: [
            { label: "Single", value: "single" },
            { label: "Multi", value: "multi" },
        ],
    },
    onRemoveItem: {
        type: "hidden",
    },
};

const defaultProps: SelectionInputProps = {
    label: "Selection Input",
    disabled: false,
    placeholder: "Select an item",
    selectionMode: "single",
    selection: DEFAULT_SELECTION,
};

const SelectionInputPage: FunctionComponent = () => {
    const [props, setProps] = useState<SelectionInputProps>(defaultProps);
    const { openSelectionModal } = useSelectionModal();

    const handleAdd = () => {
        const currentSelection = Array.isArray(props.selection)
            ? props.selection
            : props.selection
              ? [props.selection]
              : [];

        openSelectionModal({
            key: "selection-input",
            items: DEMO_ITEMS,
            selectionMode: props.selectionMode,
            label:
                typeof props.label === "string"
                    ? props.label
                    : "Selection Input",
            placeholder: props.placeholder,
            selection: currentSelection,
            onSelect: (items) => {
                setProps(
                    (prev) =>
                        ({
                            ...prev,
                            selection:
                                prev.selectionMode === "single"
                                    ? items[0]
                                    : items,
                        }) as SelectionInputProps,
                );
            },
        });
    };

    const handleRemoveItem = (item: ValueItem | undefined) => {
        if (!item) return;

        setProps(
            (prev) =>
                ({
                    ...prev,
                    selection:
                        prev.selectionMode === "single"
                            ? undefined
                            : Array.isArray(prev.selection)
                              ? prev.selection.filter(
                                    (selected) =>
                                        getItemKey(selected) !==
                                        getItemKey(item),
                                )
                              : undefined,
                }) as SelectionInputProps,
        );
    };

    const handlePropChange = (
        propId: keyof SelectionInputDemoProps,
        value: unknown,
    ) => {
        if (propId === "selectionMode") {
            const selectionMode = value as SelectionMode;

            setProps(
                (prev) =>
                    ({
                        ...prev,
                        selectionMode,
                        selection: normalizeSelection(
                            selectionMode,
                            prev.selection,
                        ),
                    }) as SelectionInputProps,
            );
            return;
        }

        setProps(
            (prev) => ({ ...prev, [propId]: value }) as SelectionInputProps,
        );
    };

    return (
        <ComponentPage
            componentName="Selection Input"
            component={
                <SelectionInput
                    {...props}
                    onRemoveItem={handleRemoveItem}
                    onAdd={handleAdd}
                />
            }
            propsPanel={
                <PropsPanel<SelectionInputDemoProps>
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={handlePropChange}
                />
            }
        />
    );
};

export default SelectionInputPage;

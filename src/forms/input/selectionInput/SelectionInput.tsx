import type { DeepPartial } from "@reillymc/es-utils";

import type { ComponentIconAssets } from "../../../icons/componentIconAssets";
import { Field, type FieldComponentProps } from "../../field";
import type { ValueItem } from "../valueItem";
import { SelectionControl } from "./SelectionControl";
import type { SelectionInputTheme } from "./SelectionInput.theme";

export type SelectionInputIcons = ComponentIconAssets<"showOptions">;

interface SingleSelection<T> {
    selectionMode: "single";
    selection?: ValueItem<T>;
}

interface MultiSelection<T> {
    selectionMode: "multi";
    selection?: Array<ValueItem<T>>;
}

export type SelectionInputProps<T = string> = FieldComponentProps & {
    placeholder?: string;
    theme?: DeepPartial<SelectionInputTheme>;
    onRemoveItem?: (item: ValueItem<T> | undefined) => void;
    onAdd?: () => void;
} & (SingleSelection<T> | MultiSelection<T>);

/**
 * Selection field with a full-surface press layer to trigger external
 * picker UI flow.
 */
export const SelectionInput = <T,>({
    placeholder,
    selectionMode,
    selection,
    theme: themeOverrides,
    onAdd,
    onRemoveItem,
    ...fieldProps
}: SelectionInputProps<T>) => (
    <Field {...fieldProps}>
        <SelectionControl
            placeholder={placeholder}
            selectionMode={selectionMode}
            selection={selection}
            themeOverrides={themeOverrides}
            onAdd={onAdd}
            onRemoveItem={onRemoveItem}
        />
    </Field>
);

SelectionInput.displayName = "SelectionInput";

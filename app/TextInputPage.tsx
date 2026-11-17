import type { FunctionComponent } from "react";
import {
    TextInput,
    type TextInputProps,
} from "@reillymc/react-native-components/forms";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import {
    ContentPropDefinitions,
    FieldPropDefinitions,
    FieldTextInputPropDefinitions,
} from "../demo/helpers";

const propDefinitions: PropDefinitions<TextInputProps> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "Text Input",
    },
    hideLabel: FieldPropDefinitions.hideLabel,
    help: FieldPropDefinitions.help,
    error: FieldPropDefinitions.error,
    required: FieldPropDefinitions.required,
    variant: FieldPropDefinitions.variant,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
    placeholder: FieldTextInputPropDefinitions.placeholder,
    clearButtonMode: FieldTextInputPropDefinitions.clearButtonMode,
};

const TextInputPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Text Input"
            component={<TextInput {...props} />}
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={onChange}
                />
            }
        />
    );
};

export default TextInputPage;

import { type FunctionComponent, useState } from "react";
import {
    TextInput,
    type TextInputProps,
} from "@reillymc/react-native-components/forms";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import {
    FieldPropDefinitions,
    FieldTextInputPropDefinitions,
} from "../demo/helpers";

const propDefinitions: PropDefinitions<TextInputProps> = {
    label: FieldPropDefinitions.label,
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

const defaultProps: TextInputProps = {
    placeholder: "Text Input",
    disabled: false,
};

const TextInputPage: FunctionComponent = () => {
    const [props, setProps] = useState<TextInputProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Text Input"
            component={<TextInput {...props} />}
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

export default TextInputPage;

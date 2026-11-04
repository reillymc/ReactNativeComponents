import { type FunctionComponent, useState } from "react";
import {
    RatingInput,
    type RatingInputProps,
} from "@reillymc/react-native-components/forms";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { FieldPropDefinitions } from "../demo/helpers";

const defaultProps: RatingInputProps = {
    disabled: false,
    max: 10,
};

const propDefinitions: PropDefinitions<RatingInputProps> = {
    label: FieldPropDefinitions.label,
    hideLabel: FieldPropDefinitions.hideLabel,
    help: FieldPropDefinitions.help,
    error: FieldPropDefinitions.error,
    required: FieldPropDefinitions.required,
    variant: FieldPropDefinitions.variant,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
    max: {
        type: "number",
        label: "Max Value",
    },
    scale: {
        type: "number",
        label: "Scale",
    },
};

const RatingInputPage: FunctionComponent = () => {
    const [props, setProps] = useState<RatingInputProps>(defaultProps);
    const [value, setValue] = useState<number | undefined>(undefined);

    return (
        <ComponentPage
            componentName="Rating Input"
            component={
                <RatingInput {...props} value={value} onChange={setValue} />
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

export default RatingInputPage;

import { type FunctionComponent, useState } from "react";
import {
    RatingInput,
    type RatingInputProps,
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
    RatingPropDefinitions,
} from "../demo/helpers";

const propDefinitions: PropDefinitions<RatingInputProps> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "Rating Input",
    },
    hideLabel: FieldPropDefinitions.hideLabel,
    help: FieldPropDefinitions.help,
    error: FieldPropDefinitions.error,
    required: FieldPropDefinitions.required,
    variant: FieldPropDefinitions.variant,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
    max: RatingPropDefinitions.max,
    scale: RatingPropDefinitions.scale,
};

const RatingInputPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);
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
                    onChange={onChange}
                />
            }
        />
    );
};

export default RatingInputPage;

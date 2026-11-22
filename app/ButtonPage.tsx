import type { FunctionComponent } from "react";
import {
    Button,
    type ButtonProps,
} from "@reillymc/react-native-components/actions";

import {
    ComponentPage,
    enumPropDefinition,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import {
    ContentPropDefinitions,
    InteractionPropDefinitions,
    VariantPropDefinitions,
} from "../demo/helpers";

const propDefinitions: PropDefinitions<ButtonProps> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "Primary Button",
    },
    variant: VariantPropDefinitions.button,
    appearance: VariantPropDefinitions.buttonAppearance,
    disabled: InteractionPropDefinitions.disabled,
    width: enumPropDefinition({
        label: "Width",
        default: "auto",
        values: [
            { label: "Auto", value: "auto" },
            { label: "Medium", value: "medium" },
        ],
    }),
    onPress: InteractionPropDefinitions.onPress,
};

const ButtonPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Button"
            component={<Button {...props} />}
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

export default ButtonPage;

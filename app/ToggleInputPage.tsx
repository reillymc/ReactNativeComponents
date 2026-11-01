import { type FunctionComponent, useState } from "react";
import {
    Octicons,
    type OcticonsIconName,
} from "@react-native-vector-icons/octicons";
import {
    ToggleInput,
    type ToggleInputProps,
} from "@reillymc/react-native-components/forms";
import type { IconComponentProps } from "@reillymc/react-native-components/icons";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { FieldPropDefinitions, glyphMapValueItems } from "../demo/helpers";

type Props = ToggleInputProps<OcticonsIconName> &
    Required<Pick<IconComponentProps<OcticonsIconName>, "iconSet">>;

const propDefinitions: PropDefinitions<Props> = {
    label: FieldPropDefinitions.label,
    help: FieldPropDefinitions.help,
    variant: FieldPropDefinitions.variant,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
    appearance: {
        type: "enum",
        label: "Style variant",
        default: "Primary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
        ],
    },
    iconName: {
        type: "enum",
        label: "Icon Name",
        values: glyphMapValueItems,
    },
    onChange: {
        type: "hidden",
    },
    iconSet: {
        type: "hidden",
    },
};

const defaultProps: Props = {
    iconSet: Octicons,
    disabled: false,
    onChange: () => null,
    appearance: "primary",
    label: "Toggle input label",
    iconName: "check",
};

const ToggleInputPage: FunctionComponent = () => {
    const [props, setProps] = useState<Props>(defaultProps);
    const [toggled, setToggled] = useState(false);

    return (
        <ComponentPage
            componentName="Toggle Input"
            component={
                <ToggleInput {...props} onChange={setToggled} value={toggled} />
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

export default ToggleInputPage;

import { type FunctionComponent, useState } from "react";
import type { OcticonsIconName } from "@react-native-vector-icons/octicons";
import {
    ToggleInput,
    type ToggleInputProps,
} from "@reillymc/react-native-components/forms";
import type { IconComponentProps } from "@reillymc/react-native-components/icons";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import {
    ContentPropDefinitions,
    FieldPropDefinitions,
    IconPropDefinitions,
    InteractionPropDefinitions,
    VariantPropDefinitions,
} from "../demo/helpers";

type Props = ToggleInputProps<OcticonsIconName> &
    Required<Pick<IconComponentProps<OcticonsIconName>, "iconSet">>;

const propDefinitions: PropDefinitions<Props> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "Toggle Input",
    },
    help: FieldPropDefinitions.help,
    variant: VariantPropDefinitions.size,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
    appearance: VariantPropDefinitions.toggleAppearance,
    iconName: {
        ...IconPropDefinitions.iconName,
        default: "check",
    },
    onChange: InteractionPropDefinitions.hiddenOnChange,
    iconSet: IconPropDefinitions.iconSet,
};

const ToggleInputPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);
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
                    onChange={onChange}
                />
            }
        />
    );
};

export default ToggleInputPage;

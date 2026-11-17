import type { FunctionComponent } from "react";
import type { OcticonsIconName } from "@react-native-vector-icons/octicons";
import {
    IconAction,
    type IconActionProps,
} from "@reillymc/react-native-components/actions";
import type { IconComponentProps } from "@reillymc/react-native-components/icons";

import {
    ComponentPage,
    enumPropDefinition,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import {
    ContentPropDefinitions,
    IconPropDefinitions,
    InteractionPropDefinitions,
    VariantPropDefinitions,
} from "../demo/helpers";

type Props = IconComponentProps<OcticonsIconName> & IconActionProps;

const propDefinitions: PropDefinitions<Props> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "Secondary IconAction",
    },
    iconName: IconPropDefinitions.iconName,
    variant: VariantPropDefinitions.action,
    iconPosition: enumPropDefinition({
        label: "Icon position",
        default: "start",
        values: [
            { label: "Start", value: "start" },
            { label: "End", value: "end" },
        ],
    }),
    disabled: InteractionPropDefinitions.disabled,
    onPress: InteractionPropDefinitions.onPress,
    iconSet: IconPropDefinitions.iconSet,
};

const IconActionPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="IconAction"
            component={<IconAction {...props} />}
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

export default IconActionPage;

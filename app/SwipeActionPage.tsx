import type { FunctionComponent } from "react";
import { View } from "react-native";
import type { OcticonsIconName } from "@react-native-vector-icons/octicons";
import {
    SwipeAction,
    type SwipeActionProps,
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

type Props = IconComponentProps<OcticonsIconName> & SwipeActionProps;

const propDefinitions: PropDefinitions<Props> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "Edit",
    },
    iconName: {
        ...IconPropDefinitions.iconName,
        default: "pencil",
    },
    iconSet: IconPropDefinitions.iconSet,
    variant: VariantPropDefinitions.button,
    appearance: enumPropDefinition({
        label: "Appearance",
        default: "auto",
        values: [
            { id: "auto", label: "Auto", value: undefined },
            { label: "Prominent", value: "prominent" },
            { label: "Subtle", value: "subtle" },
        ],
    }),
    disabled: InteractionPropDefinitions.disabled,
    onPress: InteractionPropDefinitions.onPress,
};

const SwipeActionPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Swipe Action"
            component={
                <View style={{ height: 72 }}>
                    <SwipeAction {...props} />
                </View>
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

export default SwipeActionPage;

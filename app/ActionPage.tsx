import type { FC } from "react";
import {
    Action,
    type ActionProps,
} from "@reillymc/react-native-components/actions";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import {
    ContentPropDefinitions,
    InteractionPropDefinitions,
    VariantPropDefinitions,
} from "../demo/helpers";

const propDefinitions: PropDefinitions<ActionProps> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "Secondary Action",
    },
    variant: VariantPropDefinitions.action,
    disabled: InteractionPropDefinitions.disabled,
    onPress: InteractionPropDefinitions.onPress,
};

const ActionPage: FC = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Action"
            component={<Action {...props} />}
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

export default ActionPage;

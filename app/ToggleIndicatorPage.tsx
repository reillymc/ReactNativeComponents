import type { FunctionComponent } from "react";
import type { OcticonsIconName } from "@react-native-vector-icons/octicons";
import {
    ToggleIndicator,
    type ToggleIndicatorProps,
} from "@reillymc/react-native-components/display";
import type { IconComponentProps } from "@reillymc/react-native-components/icons";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import { IconPropDefinitions, VariantPropDefinitions } from "../demo/helpers";

type Props = ToggleIndicatorProps<OcticonsIconName> &
    Required<Pick<IconComponentProps<OcticonsIconName>, "iconSet">>;

const propDefinitions: PropDefinitions<Props> = {
    value: {
        type: "boolean",
        label: "Value",
        default: false,
    },
    appearance: VariantPropDefinitions.toggleAppearance,
    variant: VariantPropDefinitions.size,
    iconName: {
        ...IconPropDefinitions.iconName,
        default: "check",
    },
    iconSet: IconPropDefinitions.iconSet,
};

const ToggleIndicatorPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Toggle Indicator"
            component={<ToggleIndicator {...props} />}
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

export default ToggleIndicatorPage;

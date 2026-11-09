import { type FunctionComponent, useState } from "react";
import {
    Octicons,
    type OcticonsIconName,
} from "@react-native-vector-icons/octicons";
import {
    ToggleIndicator,
    type ToggleIndicatorProps,
} from "@reillymc/react-native-components/display";
import type { IconComponentProps } from "@reillymc/react-native-components/icons";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import {
    IconPropDefinitions,
    SizeVariantPropDefinitions,
} from "../demo/helpers";

type Props = ToggleIndicatorProps<OcticonsIconName> &
    Required<Pick<IconComponentProps<OcticonsIconName>, "iconSet">>;

const defaultProps: Props = {
    value: true,
    appearance: "primary",
    variant: "regular",
    iconSet: Octicons,
    iconName: "check",
};

const propDefinitions: PropDefinitions<Props> = {
    value: {
        type: "boolean",
        label: "Value",
    },
    appearance: {
        type: "enum",
        label: "Appearance",
        default: "Primary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
        ],
    },
    variant: SizeVariantPropDefinitions.variant,
    iconName: IconPropDefinitions.iconName,
    iconSet: IconPropDefinitions.iconSet,
};

const ToggleIndicatorPage: FunctionComponent = () => {
    const [props, setProps] = useState<Props>(defaultProps);

    return (
        <ComponentPage
            componentName="Toggle Indicator"
            component={<ToggleIndicator {...props} />}
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

export default ToggleIndicatorPage;

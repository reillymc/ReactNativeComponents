import { type FunctionComponent, useState } from "react";
import {
    Octicons,
    type OcticonsIconName,
} from "@react-native-vector-icons/octicons";
import {
    IconButton,
    type IconButtonProps,
} from "@reillymc/react-native-components/actions";
import type { IconComponentProps } from "@reillymc/react-native-components/icons";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { IconPropDefinitions } from "../demo/helpers";

type Props = IconComponentProps<OcticonsIconName> & IconButtonProps;

const defaultProps: Props = {
    iconSet: Octicons,
    iconName: "arrow-both",
    variant: "primary",
    appearance: "subtle",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<Props> = {
    iconName: IconPropDefinitions.iconName,
    variant: {
        type: "enum",
        label: "Style variant",
        default: defaultProps.variant,
        values: [
            { label: "Primary", value: "primary" },
            { label: "Destructive", value: "destructive" },
        ],
    },
    appearance: {
        type: "enum",
        label: "Appearance",
        values: [
            { label: "Prominent", value: "prominent" },
            { label: "Subtle", value: "subtle" },
        ],
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    onPress: {
        type: "function",
        label: "Press action",
    },
    iconSet: IconPropDefinitions.iconSet,
};

const IconButtonPage: FunctionComponent = () => {
    const [props, setProps] = useState<Props>(defaultProps);

    return (
        <ComponentPage
            componentName="Icon Button"
            component={<IconButton {...props} />}
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

export default IconButtonPage;

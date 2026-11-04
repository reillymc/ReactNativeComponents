import { type FunctionComponent, useState } from "react";
import {
    Octicons,
    type OcticonsIconName,
} from "@react-native-vector-icons/octicons";
import {
    IconAction,
    type IconActionProps,
} from "@reillymc/react-native-components/actions";
import type { IconComponentProps } from "@reillymc/react-native-components/icons";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { IconPropDefinitions } from "../demo/helpers";

type Props = IconComponentProps<OcticonsIconName> & IconActionProps;

const defaultProps: Props = {
    iconSet: Octicons,
    label: "Secondary IconAction",
    iconName: "arrow-both",
    variant: "secondary",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<Props> = {
    label: {
        type: "string",
        label: "Label",
    },
    iconName: IconPropDefinitions.iconName,
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Secondary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
        ],
    },
    iconPosition: {
        type: "enum",
        label: "Icon position",
        default: "start",
        values: [
            { label: "Start", value: "start" },
            { label: "End", value: "end" },
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

const IconActionPage: FunctionComponent = () => {
    const [props, setProps] = useState<Props>(defaultProps);

    return (
        <ComponentPage
            componentName="IconAction"
            component={<IconAction {...props} />}
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

export default IconActionPage;

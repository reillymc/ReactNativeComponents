/** biome-ignore-all lint/suspicious/noExplicitAny: don't need to worry about type-safe usage here */
import { type FunctionComponent, useState } from "react";
import {
    Octicons,
    type OcticonsIconName,
} from "@react-native-vector-icons/octicons";
import {
    Icon,
    type IconComponentProps,
    type IconProps,
} from "@reillymc/react-native-components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { glyphMapValueItems } from "../demo/helpers";

type Props = IconComponentProps<OcticonsIconName> & IconProps;

const defaultProps: Props = {
    iconSet: Octicons,
    iconName: "arrow-both",
};

const propDefinitions: PropDefinitions<Props> = {
    iconName: {
        type: "enum",
        label: "Icon Name",
        values: glyphMapValueItems,
    },
    iconSet: {
        type: "hidden",
    },
};

const IconPage: FunctionComponent = () => {
    const [props, setProps] = useState<Props>(defaultProps);

    return (
        <ComponentPage
            componentName="Icon"
            component={<Icon {...props} />}
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

export default IconPage;

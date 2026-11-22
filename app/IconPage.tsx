/** biome-ignore-all lint/suspicious/noExplicitAny: don't need to worry about type-safe usage here */
import type { FunctionComponent } from "react";
import type { OcticonsIconName } from "@react-native-vector-icons/octicons";
import {
    Icon,
    type IconComponentProps,
    type IconProps,
} from "@reillymc/react-native-components/icons";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import { IconPropDefinitions } from "../demo/helpers";

type Props = IconComponentProps<OcticonsIconName> & IconProps;

const propDefinitions: PropDefinitions<Props> = {
    iconName: IconPropDefinitions.iconName,
    iconSet: IconPropDefinitions.iconSet,
};

const IconPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Icon"
            component={<Icon {...props} />}
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

export default IconPage;

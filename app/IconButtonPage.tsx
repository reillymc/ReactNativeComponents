import type { FunctionComponent } from "react";
import type { OcticonsIconName } from "@react-native-vector-icons/octicons";
import {
    IconButton,
    type IconButtonProps,
} from "@reillymc/react-native-components/actions";
import type { IconComponentProps } from "@reillymc/react-native-components/icons";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import {
    IconPropDefinitions,
    InteractionPropDefinitions,
    VariantPropDefinitions,
} from "../demo/helpers";

type Props = IconComponentProps<OcticonsIconName> & IconButtonProps;

const propDefinitions: PropDefinitions<Props> = {
    iconName: IconPropDefinitions.iconName,
    variant: VariantPropDefinitions.button,
    appearance: VariantPropDefinitions.buttonAppearance,
    disabled: InteractionPropDefinitions.disabled,
    onPress: InteractionPropDefinitions.onPress,
    iconSet: IconPropDefinitions.iconSet,
};

const IconButtonPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Icon Button"
            component={<IconButton {...props} />}
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

export default IconButtonPage;

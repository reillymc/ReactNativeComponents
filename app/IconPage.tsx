/** biome-ignore-all lint/suspicious/noExplicitAny: don't need to worry about type-safe usage here */
import { type FunctionComponent, useState } from "react";
import {
    Icon,
    type IconBaseDefaultProps,
    type IconProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";
import { glyphMapValueItems } from "../helpers";

type Props = IconBaseDefaultProps & IconProps;

const defaultProps: Props = {
    iconName: "arrow-both",
};

const propDefinitions: PropDefinitions<Props> = {
    iconName: {
        type: "enum",
        label: "Icon Name",
        values: glyphMapValueItems,
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

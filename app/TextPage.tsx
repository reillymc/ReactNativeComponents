import type { FC } from "react";
import {
    Text,
    type TextProps,
} from "@reillymc/react-native-components/typography";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import { VariantPropDefinitions } from "../demo/helpers";

const propDefinitions: PropDefinitions<TextProps> = {
    children: {
        type: "string",
        label: "Text",
        default: "Text",
    },
    variant: VariantPropDefinitions.text,
};

const TextPage: FC = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Text"
            component={<Text {...props} />}
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

export default TextPage;

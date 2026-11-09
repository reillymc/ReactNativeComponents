import { type FC, useState } from "react";
import {
    Text,
    type TextProps,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";

const defaultProps: TextProps = {
    children: "Text",
    variant: "body",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<TextProps> = {
    children: {
        type: "string",
        label: "Text",
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Secondary",
        values: [
            { label: "Label", value: "label" },
            { label: "Caption", value: "caption" },
        ],
    },
};

const TextPage: FC = () => {
    const [props, setProps] = useState<TextProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Text"
            component={<Text {...props} />}
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

export default TextPage;

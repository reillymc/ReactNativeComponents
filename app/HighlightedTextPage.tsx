import { type FC, useState } from "react";
import {
    HighlightedText,
    type HighlightedTextProps,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";

const defaultProps: HighlightedTextProps = {
    text: "HighlightedText",
    highlight: "Highlight",
    variant: "body",
};

const propDefinitions: PropDefinitions<HighlightedTextProps> = {
    text: {
        type: "string",
        label: "Text",
    },
    highlight: {
        type: "string",
        label: "Highlighted Text",
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Secondary",
        values: [
            { label: "Body", value: "body" },
            { label: "Caption", value: "caption" },
        ],
    },
};

const HighlightedTextPage: FC = () => {
    const [props, setProps] = useState<HighlightedTextProps>(defaultProps);

    return (
        <ComponentPage
            componentName="HighlightedText"
            component={<HighlightedText {...props} />}
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

export default HighlightedTextPage;

import type { FC } from "react";
import {
    HighlightedText,
    type HighlightedTextProps,
} from "@reillymc/react-native-components/typography";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import { VariantPropDefinitions } from "../demo/helpers";

const propDefinitions: PropDefinitions<HighlightedTextProps> = {
    text: {
        type: "string",
        label: "Text",
        default: "",
    },
    highlight: {
        type: "string",
        label: "Highlighted Text",
        default: "",
    },
    variant: VariantPropDefinitions.text,
};

const HighlightedTextPage: FC = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="HighlightedText"
            component={<HighlightedText {...props} />}
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

export default HighlightedTextPage;

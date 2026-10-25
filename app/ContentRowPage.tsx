import { useState } from "react";
import {
    ContentRow,
    type ContentRowProps,
} from "@reillymc/react-native-components/display";
import { Text } from "@reillymc/react-native-components/typography";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";

const TWO_ITEMS = (
    <>
        <Text>Description</Text>
        <Text>Description 2</Text>
    </>
);

const THREE_ITEMS = (
    <>
        <Text>One</Text>
        <Text>Two</Text>
        <Text>Three</Text>
    </>
);

const defaultProps: ContentRowProps = {
    children: TWO_ITEMS,
    separator: undefined,
};

const propDefinitions: PropDefinitions<ContentRowProps> = {
    children: {
        type: "enum",
        label: "Children",
        default: "Two items",
        values: [
            { id: "two", label: "Two items", value: TWO_ITEMS },
            { id: "three", label: "Three items", value: THREE_ITEMS },
        ],
    },
    separator: {
        type: "enum",
        label: "Separator",
        default: "Default dot",
        values: [
            { id: "default", label: "Default dot", value: undefined },
            { id: "slash", label: "Slash", value: <Text>/</Text> },
            { id: "none", label: "None", value: null },
        ],
    },
};

const ContentRowPage = () => {
    const [props, setProps] = useState<ContentRowProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Content Row"
            component={<ContentRow {...props} />}
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

export default ContentRowPage;

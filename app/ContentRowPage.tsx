import {
    ContentRow,
    type ContentRowProps,
} from "@reillymc/react-native-components/display";
import { Text } from "@reillymc/react-native-components/typography";

import {
    ComponentPage,
    enumPropDefinition,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";

const propDefinitions: PropDefinitions<ContentRowProps> = {
    children: enumPropDefinition({
        label: "Children",
        default: "two",
        values: [
            {
                id: "two",
                label: "Two items",
                value: [
                    <Text key="description-1">Description</Text>,
                    <Text key="description-2">Description 2</Text>,
                ],
            },
            {
                id: "three",
                label: "Three items",
                value: [
                    <Text key="one">One</Text>,
                    <Text key="two">Two</Text>,
                    <Text key="three">Three</Text>,
                ],
            },
        ],
    }),
    separator: enumPropDefinition({
        label: "Separator",
        default: "default",
        values: [
            { id: "default", label: "Default dot", value: undefined },
            { id: "slash", label: "Slash", value: <Text>/</Text> },
            { id: "none", label: "None", value: null },
        ],
    }),
};

const ContentRowPage = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Content Row"
            component={<ContentRow {...props} />}
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

export default ContentRowPage;

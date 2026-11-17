import type { FunctionComponent } from "react";
import Octicons from "@react-native-vector-icons/octicons";
import {
    Tag,
    TagIcon,
    type TagProps,
} from "@reillymc/react-native-components/display";

import {
    ComponentPage,
    enumPropDefinition,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import { ContentPropDefinitions } from "../demo/helpers";

const propDefinitions: PropDefinitions<TagProps> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "Example Tag",
    },
    icon: enumPropDefinition({
        label: "Icon",
        default: "close",
        values: [
            {
                id: "none",
                label: "none",
                value: undefined,
            },
            {
                id: "close",
                label: "close",
                value: <TagIcon iconSet={Octicons} iconName="x-circle" />,
            },
        ],
    }),
    tone: enumPropDefinition({
        label: "Tone",
        default: "dark",
        values: [
            { label: "Dark", value: "dark" },
            { label: "Light", value: "light" },
        ],
    }),
};

const TagPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Tag"
            component={<Tag {...props} />}
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

export default TagPage;

import { Action } from "@reillymc/react-native-components/actions";
import {
    Toast,
    type ToastProps,
} from "@reillymc/react-native-components/feedback";
import { Text } from "@reillymc/react-native-components/typography";

import {
    ComponentPage,
    enumPropDefinition,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";

type ToastPageProps = ToastProps & {
    visible: boolean;
};

const propDefinitions: PropDefinitions<ToastPageProps> = {
    visible: {
        type: "boolean",
        label: "Visible",
        default: true,
    },
    children: enumPropDefinition({
        label: "Content",
        default: "success",
        values: [
            {
                id: "success",
                label: "Success",
                value: <Text>Saved successfully</Text>,
            },
            {
                id: "long",
                label: "Long message",
                value: (
                    <Text>
                        Your changes were saved, but some fields still need
                        attention.
                    </Text>
                ),
            },
        ],
    }),
    action: enumPropDefinition({
        label: "Action",
        default: "undo",
        values: [
            { id: "none", label: "None", value: undefined },
            {
                id: "undo",
                label: "Undo",
                value: <Action label="Undo" onPress={() => null} />,
            },
            {
                id: "dismiss",
                label: "Dismiss",
                value: <Action label="Dismiss" onPress={() => null} />,
            },
        ],
    }),
};

const ToastPage = () => {
    const { props, onChange } = useComponentProps(propDefinitions);
    const { visible, ...toastProps } = props;

    return (
        <ComponentPage
            componentName="Toast"
            component={
                visible ? <Toast {...toastProps} /> : <Text>Toast hidden</Text>
            }
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

export default ToastPage;

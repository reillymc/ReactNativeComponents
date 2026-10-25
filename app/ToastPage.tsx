import { useState } from "react";
import { Action } from "@reillymc/react-native-components/actions";
import {
    Toast,
    type ToastProps,
} from "@reillymc/react-native-components/feedback";
import { Text } from "@reillymc/react-native-components/typography";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";

type ToastPageProps = ToastProps & {
    visible: boolean;
};

const SUCCESS_CONTENT = <Text>Saved successfully</Text>;
const LONG_CONTENT = (
    <Text>Your changes were saved, but some fields still need attention.</Text>
);
const UNDO_ACTION = <Action label="Undo" onPress={() => null} />;
const DISMISS_ACTION = <Action label="Dismiss" onPress={() => null} />;

const defaultProps: ToastPageProps = {
    visible: true,
    children: SUCCESS_CONTENT,
    action: UNDO_ACTION,
};

const propDefinitions: PropDefinitions<ToastPageProps> = {
    visible: {
        type: "boolean",
        label: "Visible",
    },
    children: {
        type: "enum",
        label: "Content",
        default: "Success",
        values: [
            { id: "success", label: "Success", value: SUCCESS_CONTENT },
            { id: "long", label: "Long message", value: LONG_CONTENT },
        ],
    },
    action: {
        type: "enum",
        label: "Action",
        default: "Undo",
        values: [
            { id: "none", label: "None", value: undefined },
            { id: "undo", label: "Undo", value: UNDO_ACTION },
            { id: "dismiss", label: "Dismiss", value: DISMISS_ACTION },
        ],
    },
};

const ToastPage = () => {
    const [props, setProps] = useState<ToastPageProps>(defaultProps);
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
                    onChange={(propId, value) =>
                        setProps((prev) => ({ ...prev, [propId]: value }))
                    }
                />
            }
        />
    );
};

export default ToastPage;

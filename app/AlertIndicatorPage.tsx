import { type FunctionComponent, useState } from "react";
import {
    AlertIndicator,
    type AlertIndicatorProps,
} from "@reillymc/react-native-components/feedback";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";

const defaultProps: AlertIndicatorProps = {
    label: "8",
    variant: "primary",
};

const propDefinitions: PropDefinitions<AlertIndicatorProps> = {
    label: {
        type: "string",
        label: "Label",
    },
    variant: {
        type: "enum",
        label: "Variant",
        default: "Primary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
        ],
    },
};

const AlertIndicatorPage: FunctionComponent = () => {
    const [props, setProps] = useState<AlertIndicatorProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Alert Indicator"
            component={<AlertIndicator {...props} />}
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

export default AlertIndicatorPage;

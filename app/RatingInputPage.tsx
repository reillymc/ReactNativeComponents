import React from "react";
import {
    RatingInput,
    type RatingInputProps,
} from "@reillymc/react-native-components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { CommonInputProps } from "../demo/helpers";

const defaultProps: RatingInputProps = {
    disabled: false,
    max: 10,
};

const propDefinitions: PropDefinitions<RatingInputProps> = {
    ...CommonInputProps,
    max: {
        type: "number",
        label: "Max Value",
    },
    scale: {
        type: "number",
        label: "Scale",
    },
};

const RatingInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<RatingInputProps>(defaultProps);
    const [value, setValue] = React.useState<number | undefined>(undefined);

    return (
        <ComponentPage
            componentName="Rating Input"
            component={
                <RatingInput {...props} value={value} onChange={setValue} />
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

export default RatingInputPage;

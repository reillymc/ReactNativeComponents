import { type FC, useState } from "react";
import {
    Rating,
    type RatingProps,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";

const defaultProps: RatingProps = {
    value: 5,
    max: 10,
};

const propDefinitions: PropDefinitions<RatingProps> = {
    value: {
        type: "number",
        label: "Rating value",
    },
    max: {
        type: "number",
        label: "Max Value",
    },
    scale: {
        type: "number",
        label: "Scale",
    },
};

const RatingPage: FC = () => {
    const [props, setProps] = useState<RatingProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Rating"
            component={<Rating {...props} />}
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

export default RatingPage;

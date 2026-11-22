import type { FC } from "react";
import {
    Rating,
    type RatingProps,
} from "@reillymc/react-native-components/display";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import { RatingPropDefinitions } from "../demo/helpers";

const propDefinitions: PropDefinitions<RatingProps> = {
    value: RatingPropDefinitions.value,
    max: RatingPropDefinitions.max,
    scale: RatingPropDefinitions.scale,
};

const RatingPage: FC = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Rating"
            component={<Rating {...props} />}
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

export default RatingPage;

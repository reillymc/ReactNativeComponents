import React from "react";

import { IconButton } from "@reillymc/react-native-components";
import { ComponentPage } from "../components";

export const IconButtonPage: React.FunctionComponent = () => {
    return (
        <ComponentPage
            componentName="Icon Button"
            component={
                <IconButton label="Action" iconName="close" onPress={() => null} variant="primary" size="large" />
            }
        />
    );
};

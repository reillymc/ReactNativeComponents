import React from "react";

import { Button } from "@reillymc/react-native-components";
import { ComponentPage } from "../components";

export const ButtonPage: React.FunctionComponent = () => {
    return (
        <ComponentPage
            componentName="Button"
            component={<Button label="Secondary Button" onPress={() => null} variant="secondary" size="large" />}
        />
    );
};

import React from "react";
import { ScrollPage, NavigationHeader } from "@reillymc/react-native-components";

import { ComponentPage } from "../components";

export const ScrollPagePage: React.FunctionComponent = () => {
    return (
        <ComponentPage
            componentName="Scroll Page"
            fullscreen={true}
            component={<ScrollPage heading={<NavigationHeader heading="Example Scroll Page" />} />}
        />
    );
};

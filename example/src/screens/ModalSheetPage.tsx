import React from "react";

import { ModalSheet } from "@reillymc/react-native-components";
import { ComponentPage } from "../components";

export const ModalSheetPage: React.FunctionComponent = () => {
    return (
        <ComponentPage
            componentName="Button"
            component={<ModalSheet height="mid" onClose={() => null} show={true} />}
        />
    );
};

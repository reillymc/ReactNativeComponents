import React from "react";
import { Action, Button, Form, ModalHeader, ModalSheet, TextInput } from "@reillymc/react-native-components";

import { ComponentPage } from "../components";

export const ModalSheetPage: React.FunctionComponent = () => {
    const [show, setShow] = React.useState(true);

    return (
        <ComponentPage
            componentName="Modal Sheet"
            component={
                <ModalSheet height="mid" onClose={() => setShow(false)} show={show}>
                    <ModalHeader
                        heading="Modal Header"
                        rightItem={<Action onPress={() => setShow(false)} label="Close" />}
                    />
                    <Form>
                        <TextInput />
                    </Form>
                </ModalSheet>
            }
            propsPanel={<Button onPress={() => setShow(true)} label="Show Modal" />}
        />
    );
};

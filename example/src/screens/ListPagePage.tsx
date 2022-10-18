import React from "react";

import { Button, ListPage } from "@reillymc/react-native-components";
import { ComponentPage } from "../components";

export const ListPagePage: React.FunctionComponent = () => {
    type ExampleData = {
        id: string;
        title: string;
        description: string;
    };

    const exampleData: ExampleData[] = [
        {
            id: "1",
            title: "Title 1",
            description: "Description 1",
        },
        {
            id: "2",
            title: "Title 2",
            description: "Description 2",
        },
        {
            id: "3",
            title: "Title 3",
            description: "Description 3",
        },
    ];

    return (
        <ComponentPage
            componentName="Button"
            fullscreen={true}
            component={
                <ListPage
                    heading="ListPage"
                    data={exampleData}
                    renderItem={({ item }) => (
                        <Button label={item.title} onPress={() => null} />
                    )}
                />
            }
        />
    );
};

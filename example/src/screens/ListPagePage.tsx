import React from "react";
import { Button, ListPage, NavigationHeader } from "@reillymc/react-native-components";

import { ComponentPage } from "../components";

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

export const ListPagePage: React.FunctionComponent = () => {
    return (
        <ComponentPage
            componentName="List Page"
            fullscreen={true}
            component={
                <ListPage
                    heading={<NavigationHeader heading="Example List Page" />}
                    data={exampleData}
                    renderItem={({ item }) => <Button label={item.title} onPress={() => null} />}
                />
            }
        />
    );
};

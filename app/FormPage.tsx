import { type FC, useState } from "react";
import { ScrollView } from "react-native";
import { Stack } from "expo-router";
import Octicons from "@react-native-vector-icons/octicons";
import { Button } from "@reillymc/react-native-components/actions";
import {
    FormContainer,
    FormRow,
    TextInput,
    ToggleInput,
} from "@reillymc/react-native-components/forms";
import { usePalette } from "@reillymc/react-native-components/theme";

import { defineStyles, useStyles } from "../demo/theme";

const FormPage: FC = () => {
    const palette = usePalette();
    const styles = useStyles(createStyles);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [subscribe, setSubscribe] = useState(false);

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Form Layout",
                    headerLargeTitle: true,
                    headerLargeTitleShadowVisible: false,
                    headerLargeTitleStyle: {
                        fontFamily: palette.font.family.sans,
                        fontWeight: "800",
                    },
                    headerBackTitleStyle: {
                        fontFamily: palette.font.family.sans,
                        fontSize: palette.font.size.regular,
                    },
                    headerLargeStyle: {
                        backgroundColor: palette.color.background,
                    },
                }}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.content}
            >
                <FormContainer>
                    <TextInput label="Full name" placeholder="Ada Lovelace" />
                    <FormRow>
                        <TextInput
                            label="First name"
                            placeholder="Ada"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            label="Last name"
                            placeholder="Lovelace"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </FormRow>
                    <TextInput
                        label="Email"
                        placeholder="ada@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        label="Notes"
                        placeholder="Tell us about yourself"
                        multiline
                        helpText="This multiline field grows with its content."
                    />
                    <FormRow>
                        <TextInput label="City" placeholder="London" />
                        <TextInput
                            label="Address"
                            placeholder="123 Example Street"
                        />
                    </FormRow>
                    <ToggleInput
                        value={subscribe}
                        onChange={setSubscribe}
                        label="Subscribe to updates"
                        iconSet={Octicons}
                        iconName="check"
                    />
                    <Button label="Submit" />
                </FormContainer>
            </ScrollView>
        </>
    );
};

const createStyles = defineStyles(({ appTheme }) => ({
    content: {
        backgroundColor: appTheme.page.backgroundColor,
        paddingHorizontal: appTheme.page.horizontal,
        paddingTop: appTheme.page.top,
        paddingBottom: appTheme.page.bottom,
    },
}));

export default FormPage;

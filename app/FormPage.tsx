import type React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import Octicons from "@react-native-vector-icons/octicons";
import {
    Button,
    FormContainer,
    FormRow,
    TextInput,
    type ThemedStyles,
    ToggleInput,
    useTheme,
    useThemedStyles,
} from "@reillymc/react-native-components";

const FormPage: React.FC = () => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createStyles);

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
                        fontFamily: theme.font.family.sans,
                        fontWeight: "800",
                    },
                    headerBackTitleStyle: {
                        fontFamily: theme.font.family.sans,
                        fontSize: theme.font.size.regular,
                    },
                    headerLargeStyle: {
                        backgroundColor: theme.color.background,
                    },
                }}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.page}
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

const createStyles = ({ theme: { spacing, color } }: ThemedStyles) =>
    StyleSheet.create({
        page: {
            backgroundColor: color.background,
            paddingHorizontal: spacing.pageHorizontal,
            paddingTop: spacing.pageTop,
            paddingBottom: spacing.pageBottom,
        },
    });

export default FormPage;

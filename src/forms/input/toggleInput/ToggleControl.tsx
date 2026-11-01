import { View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { ActionBase, StateTint } from "../../../actions/action";
import {
    ToggleIndicator,
    type ToggleIndicatorProps,
} from "../../../display/toggleIndicator";
import type { IconComponentProps } from "../../../icons/IconComponentProps";
import { defineStyles, useComponent } from "../../../internal";
import { Text } from "../../../typography/text";
import { fieldAria, useFieldControlState } from "../../field";
import type { ToggleInputTheme } from "./ToggleInput.theme";

type ToggleControlProps<G extends string> = Pick<
    ToggleIndicatorProps<G>,
    "appearance" | "value"
> & {
    label?: string;
    onChange?: (value: boolean) => void;
    themeOverrides?: DeepPartial<ToggleInputTheme>;
} & Partial<IconComponentProps<G>>;

export const ToggleControl = <G extends string>({
    label,
    value,
    onChange,
    appearance,
    themeOverrides,
    iconSet,
    iconName,
}: ToggleControlProps<G>) => {
    const { field, disabled, interactive, variant } = useFieldControlState();
    const { styles, theme } = useComponent("toggleInput", {
        themeOverrides,
        createStyles,
    });

    const canToggle = interactive && !!onChange;

    return (
        <ActionBase
            onPress={canToggle ? () => onChange?.(!value) : undefined}
            disabled={disabled}
            style={styles.control}
            role="switch"
            {...fieldAria(field, { state: { checked: value } })}
        >
            {(state) => (
                <StateTint {...state} style={styles.row}>
                    <ToggleIndicator
                        value={value}
                        appearance={appearance}
                        variant={variant}
                        theme={theme.indicator}
                        iconSet={iconSet}
                        iconName={iconName}
                    />
                    {label !== undefined && (
                        <View
                            accessible={false}
                            importantForAccessibility="no-hide-descendants"
                            aria-hidden
                        >
                            <Text variant="label">{label}</Text>
                        </View>
                    )}
                </StateTint>
            )}
        </ActionBase>
    );
};

const createStyles = defineStyles((theme: ToggleInputTheme) => ({
    control: {
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.label.gap,
    },
}));

import type { FC } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import type { RatingIconVariant, RatingProps } from "../../../display/rating";
import type { ComponentIconAssets } from "../../../icons/componentIconAssets";
import { useComponent } from "../../../internal";
import { Field, type FieldComponentProps, FieldSurface } from "../../field";
import { RatingControl } from "./RatingControl";
import type { RatingInputTheme } from "./RatingInput.theme";

export type RatingInputIcons = ComponentIconAssets<RatingIconVariant>;

export type RatingInputProps = FieldComponentProps &
    Pick<RatingProps, "max" | "value" | "scale"> & {
        theme?: DeepPartial<RatingInputTheme>;
        onChange?: (value: number) => void;
    };

export const RatingInput: FC<RatingInputProps> = ({
    value = 0,
    max = 5,
    scale,
    onChange,
    theme: themeOverrides,
    ...fieldProps
}) => {
    const { theme } = useComponent("ratingInput", { themeOverrides });

    return (
        <Field {...fieldProps}>
            <FieldSurface theme={theme.surface}>
                <RatingControl
                    max={max}
                    onChange={onChange}
                    scale={scale}
                    themeOverrides={themeOverrides}
                    value={value}
                />
            </FieldSurface>
        </Field>
    );
};

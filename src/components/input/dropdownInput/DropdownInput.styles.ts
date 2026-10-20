import type { StyleFactory } from "../../../style/styleFactory";

export interface DropdownInputStyles {
    panelGap: number;
}

export const defaultDropdownInputStyles: StyleFactory<DropdownInputStyles> = ({
    spacing,
}) => ({
    panelGap: spacing.tiny,
});

import type { Theme } from "../../theme/theme";
import type { ToastStyles } from "./Toast";

export const defaultToastStyles = ({ spacing }: Theme): ToastStyles => ({
    horizontalInset: spacing.pageHorizontal + spacing.medium,
    bottomInset: 100,
});

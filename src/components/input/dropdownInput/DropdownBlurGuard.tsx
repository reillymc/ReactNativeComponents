import type { PropsWithChildren } from "react";

/**
 * Prevents the input from losing focus when interacting with the dropdown.
 * On native this is a no-op; on web it cancels the default `mousedown`
 * behaviour so a click on a menu item can complete without blurring the input.
 */
export const DropdownBlurGuard = ({ children }: PropsWithChildren) => children;

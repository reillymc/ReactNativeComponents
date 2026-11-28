import type { PropsWithChildren } from "react";

/**
 * Prevents pointer interaction with the content from moving focus away from
 * the currently focused element.
 *
 * On native this is a no-op; on web it cancels the default `mousedown`
 * behaviour that would otherwise focus the pressed element.
 */
export const FocusBlurGuard = ({ children }: PropsWithChildren) => children;

/**
 * Escapes any characters that would interfere with RegEx processing.
 */
export const EscapeForRegexProcessing = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

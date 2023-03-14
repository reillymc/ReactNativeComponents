/**
 * Checks that a string exists and contains non-whitespace characters.
 * @param str string to validate
 * @returns true if string is valid, false otherwise
 */
export const IsValidString = (str?: string): boolean => {
    if (str === null || str === undefined || str.length === 0) {
        return false;
    }

    if (str.trim().length === 0) {
        return false;
    }

    return true;
};

/**
 * Loosely compares two strings. Will convert to lowercase and remove all whitespace.
 * @param str1 string to compare
 * @param str2 string to compare
 * @returns true if the strings are equal, false otherwise
 */
export const IsEqualString = (str1?: string, str2?: string): boolean => {
    if (str1 === null || str1 === undefined || str2 === null || str2 === undefined) {
        return false;
    }

    return str1.trim().toLowerCase() === str2.trim().toLowerCase();
};

/**
 * Escapes any characters that would interfere with RegEx processing.
 */
export const EscapeForRegexProcessing = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

import { useRef } from "react";

import type { FieldControlRegistration } from "./FieldContext";

export type FieldControlRegistry = {
    registerControl: (registration: FieldControlRegistration) => () => void;
    focusFirstControl: () => void;
};

/**
 * Tracks registered field controls.
 */
export const useFieldControlRegistry = (
    disabled: boolean,
): FieldControlRegistry => {
    const registrationsRef = useRef(new Set<FieldControlRegistration>());

    const registerControl = (registration: FieldControlRegistration) => {
        const registrations = registrationsRef.current;
        registrations.add(registration);

        return () => registrations.delete(registration);
    };

    const focusFirstControl = () => {
        if (disabled) return;

        for (const registration of registrationsRef.current) {
            registration.focus();
            return;
        }
    };

    return { registerControl, focusFirstControl };
};

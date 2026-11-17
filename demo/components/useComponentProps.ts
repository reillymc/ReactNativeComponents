/** biome-ignore-all lint/suspicious/noExplicitAny: generic prop state helper */
import { useCallback, useState } from "react";

import { getDefaults } from "./getDefaults";
import type { PropDefinitions } from "./PropsPanel";

export const useComponentProps = <T extends Record<string, any>>(
    propDefinitions: PropDefinitions<T>,
) => {
    const [props, setProps] = useState(() => getDefaults(propDefinitions));

    const onChange = useCallback((propName: keyof T, value: T[keyof T]) => {
        setProps((prev) => ({ ...prev, [propName]: value }));
    }, []);

    return { props, setProps, onChange };
};

import type { Theme } from "../theme/theme";

export type StyleFactory<T extends object = Record<never, never>> = (
    theme: Theme,
) => T;

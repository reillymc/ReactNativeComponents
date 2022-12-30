export const Undefined: <T>(x?: T) => x is T = <T>(x?: T): x is T => x !== null && x !== undefined;

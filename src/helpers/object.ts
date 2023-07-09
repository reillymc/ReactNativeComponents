type Undefined = <T>(x?: T) => x is NonNullable<typeof x>;

export const Undefined: Undefined = (x): x is NonNullable<typeof x> => x !== null && x !== undefined;

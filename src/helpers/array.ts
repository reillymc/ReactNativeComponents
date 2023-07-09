import { Undefined } from "./object";

export const EnsureArray = <T>(x: T | T[]): T[] => (Array.isArray(x) ? x : [x]);
export const EnsureDefinedArray = <T>(x: T | T[]): NonNullable<T>[] => (Array.isArray(x) ? x : [x]).filter(Undefined);

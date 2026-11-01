import type {
    ContainerGeometry,
    ContainerPlacement,
} from "./AnchoredContainer";

const EMPTY_PLACEMENT: ContainerPlacement = {
    inverted: false,
    maxHeight: Number.POSITIVE_INFINITY,
};

export const getContainerPlacement = (
    geometry: ContainerGeometry | undefined,
): ContainerPlacement =>
    geometry
        ? { inverted: geometry.inverted, maxHeight: geometry.maxHeight }
        : EMPTY_PLACEMENT;

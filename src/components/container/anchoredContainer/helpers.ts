import type {
    ContainerGeometry,
    ContainerPlacement,
} from "./AnchoredContainer";

export const EMPTY_CONTAINER_GEOMETRY: ContainerGeometry = {
    parentY: 0,
    parentHeight: 0,
    offsetY: 0,
    contentHeight: 0,
    inverted: false,
    visibleAreaHeight: 0,
    maxHeight: Number.POSITIVE_INFINITY,
};

export const EMPTY_PLACEMENT: ContainerPlacement = {
    inverted: false,
    maxHeight: Number.POSITIVE_INFINITY,
};

export const getContainerPlacement = (
    geometry: ContainerGeometry | undefined,
): ContainerPlacement =>
    geometry
        ? { inverted: geometry.inverted, maxHeight: geometry.maxHeight }
        : EMPTY_PLACEMENT;

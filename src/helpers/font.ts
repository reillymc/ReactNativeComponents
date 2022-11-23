export const scaleFont = (size: number, scale: number, appScale: number) => {
    if (appScale < 1) {
        return size;
    }

    return (size / appScale) * (appScale > 1 ? Math.max(1, appScale * scale) : 1);
};

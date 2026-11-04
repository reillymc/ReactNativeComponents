import { Fragment, type ReactNode } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";

import type { SegmentedInputDisplaySegment } from "./useSegmentedInputNavigation";

export type SegmentedInputSegmentsProps<K extends string> = {
    segments: readonly SegmentedInputDisplaySegment<K>[];
    renderSegment: (
        segment: SegmentedInputDisplaySegment<K>,
        index: number,
    ) => ReactNode;
    keyExtractor?: (
        segment: SegmentedInputDisplaySegment<K>,
        index: number,
    ) => string | number;
    style?: StyleProp<ViewStyle>;
};

export const SegmentedInputSegments = <K extends string>({
    segments,
    renderSegment,
    keyExtractor,
    style,
}: SegmentedInputSegmentsProps<K>) => (
    <View style={[styles.container, style]}>
        {segments.map((segment, index) => (
            <Fragment key={keyExtractor?.(segment, index) ?? segment.key}>
                {renderSegment(segment, index)}
            </Fragment>
        ))}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
        minWidth: 0,
        flexDirection: "row",
    },
});

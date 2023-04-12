import React from "react";

// react-native-screens is an optional peer dependency
let RNS: {
    FullWindowOverlay: React.ComponentType<{
        children: React.ReactNode;
    }>;
} | null = null;

try {
    RNS = require("react-native-screens");
} catch {}

interface FullWindowOverlayWrapperProps {
    children?: React.ReactNode;
}

export const FullWindowOverlayWrapper: React.FunctionComponent<FullWindowOverlayWrapperProps> = ({ children }) => {
    const WrapperElement = RNS?.FullWindowOverlay || React.Fragment;

    return <WrapperElement>{children}</WrapperElement>;
};

FullWindowOverlayWrapper.displayName = "FullWindowOverlayWrapper";

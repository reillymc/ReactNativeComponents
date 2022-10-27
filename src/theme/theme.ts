export type Theme = typeof DefaultTheme;

export const DefaultTheme = {
    font: {
        familyWeight: {
            light100: "Helvetica-Light",
            light200: "Helvetica-Light",
            regular400: "Helvetica",
            bold600: "Helvetica-Bold",
            bold800: "Helvetica-Bold",
        },
        size: {
            tiny: 12,
            small: 14,
            regular: 16,
            large: 20,
            xLarge: 24,
            xxLarge: 32,
        },
    },
    color: {
        primary: "#FF4242",
        secondary: "#12263A",
        primaryHighlight: "#ff8585",
        secondaryHighlight: "#22476D",
        tertiary: "#06bcc1",

        light: "#F4EDEA",

        white: "#ffffff",
        black: "#000000",

        textPrimary: "#12263A",
        textSecondary: "#22476D",
        textHighlight: "#30669c",
        textInverted: "#F4EDEA",

        grey200: "#E2E8F0",
        grey600: "#718096",
    },
    padding: {
        pageHorizontal: 16,
    },
};

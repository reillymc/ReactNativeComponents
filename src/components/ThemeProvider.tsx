import React from "react";
import { ButtonStyles } from "./Button";
import { IconButtonStyles } from "./IconButton";

type Theme = {
    font: {
        regular: string;
        bold: string;
        light: string;
        size: {
            small: number;
            regular: number;
            large: number;
            heading: number;
            title: number;
        };
    };
    color: {
        primary: string;
        secondary: string;
        tertiary: string;
        primaryHighlight: string;
        secondaryHighlight: string;
        white: string;
        black: string;

        text: string;
        textHighlight: string;
        textInverted: string;
    };
    padding: {};
    // border: {
    //     radius: {
    //         small: number;
    //         medium: number;
    //         large: number;
    //     };
    // };
};

const DefaultTheme: Theme = {
    font: {
        regular: "Helvetica",
        bold: "Helvetica-Bold",
        light: "Helvetica-Light",
        size: {
            small: 14,
            regular: 16,
            large: 20,
            heading: 24,
            title: 32,
        },
    },
    color: {
        primary: "#FF4242",
        secondary: "#12263A",
        primaryHighlight: "#ff8585",
        secondaryHighlight: "#22476D",
        tertiary: "#888888",

        white: "#ffffff",
        black: "#000000",

        text: "#12263A",
        textHighlight: "#30669c",
        textInverted: "#F4EDEA",
    },
    padding: {},
};

type Styles = {
    button: ButtonStyles;
    iconButton: IconButtonStyles;
};

// const DefaultStyles: Styles = {
//     button: {
//         height: {
//             small: 30,
//             medium: 40,
//             large: 50,
//         },
//         width: {
//             small: 80,
//             medium: 120,
//             large: 180,
//         },
//         borderRadius: 8,
//         color: {
//             primary: "#000000",
//             secondary: "#444444",
//             flat: "transparent",
//         },
//     },
// };

type CreateStyles = (theme: Theme) => Styles;

const createDefaultStyles = (theme: Theme): Styles => ({
    button: {
        height: {
            small: 30,
            medium: 40,
            large: 50,
        },
        width: {
            small: 80,
            medium: 120,
            large: 180,
        },
        borderRadius: 8,
        color: {
            primary: theme.color.primary,
            secondary: theme.color.secondary,
            flat: "transparent",
        },
        fontFamilyWeight: theme.font.regular,
    },
    iconButton: {
        size: {
            small: 50,
            medium: 60,
            large: 80,
        },
        rounded: true,
    },
});

interface ThemeContext {
    theme: Theme;
    styles: Styles;
}

const ThemeContext = React.createContext<ThemeContext>({
    theme: DefaultTheme,
    styles: createDefaultStyles(DefaultTheme),
});

interface ThemeProviderProps {
    theme?: Theme;
    styles?: Styles;
    // createStyles: CreateStyles;
    children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
    theme = DefaultTheme,
    styles = createDefaultStyles(theme),
    // createStyles,
    children,
}: ThemeProviderProps) => {
    // const themedStyles = React.useMemo(() => createStyles(theme), [theme]);

    return <ThemeContext.Provider value={{ theme, styles }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => React.useContext(ThemeContext);

type Generator<T extends {}> = (theme: ThemeContext) => T;

const useThemedStyles = <T extends {}>(generator: Generator<T>) => {
    const theme = useTheme();

    const themedStyles = React.useMemo(() => generator(theme), [generator, theme]);

    return themedStyles;
};

export {
    ThemeProvider,
    ThemeContext,
    Theme,
    DefaultTheme,
    Styles,
    CreateStyles,
    createDefaultStyles,
    useTheme,
    useThemedStyles,
};

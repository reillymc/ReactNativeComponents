import React from "react";
import { ActionStyles } from "./Action";
import { ButtonStyles } from "./Button";
import { HeadingStyles } from "./Heading";
import { IconButtonStyles } from "./IconButton";
import { NavigationHeaderStyles } from "./NavigationHeader";
import { TextInputStyles } from "./TextInput";
import { TitleStyles } from "./Title";
import { ToggleInputStyles } from "./ToggleInput";

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
    size: {
        heightIncrement1: number;
        heightIncrement2: number;
        heightIncrement3: number;
        heightIncrement4: number;
        heightIncrement5: number;
    };
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
            title: 36,
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
    size: {
        heightIncrement1: 30,
        heightIncrement2: 40,
        heightIncrement3: 50,
        heightIncrement4: 60,
        heightIncrement5: 80,
    },
};

type Styles = {
    action: ActionStyles;
    button: ButtonStyles;
    iconButton: IconButtonStyles;
    textInput: TextInputStyles;
    toggleInput: ToggleInputStyles;
    title: TitleStyles;
    heading: HeadingStyles;
    navigationHeader: NavigationHeaderStyles;
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
    action: {
        color: {
            // Currently overridden by pressed methods
            primary: theme.color.primary,
            secondary: theme.color.secondary,
            flat: theme.color.text,
        },
        fontFamilyWeight: theme.font.regular,
    },
    button: {
        height: {
            small: theme.size.heightIncrement1,
            medium: theme.size.heightIncrement2,
            large: theme.size.heightIncrement3,
        },
        width: {
            small: 80,
            medium: 120,
            large: 180,
        },
        borderRadius: 8,
        color: {
            // Currently overridden by pressed methods
            primary: theme.color.primary,
            secondary: theme.color.secondary,
            flat: "transparent",
        },
        fontFamilyWeight: theme.font.regular,
    },
    iconButton: {
        size: {
            small: theme.size.heightIncrement3,
            medium: theme.size.heightIncrement4,
            large: theme.size.heightIncrement5,
        },
    },
    textInput: {
        borderRadius: 8,
        fontFamilyWeight: theme.font.regular,
        width: {
            full: "100%",
            large: "70%",
            small: "50%",
        },
    },
    toggleInput: {},
    title: {
        fontFamilyWeight: theme.font.bold,
    },
    heading: {
        fontFamilyWeight: theme.font.bold,
    },
    navigationHeader: {
        fontFamilyWeight: theme.font.regular,
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

type Generator<T extends {}, U extends {} | undefined> = (theme: ThemeContext, componentProps: U) => T;

const useThemedStyles = <T extends {}, U extends {} | undefined>(generator: Generator<T, U>, componentProps: U) => {
    const theme = useTheme();

    const themedStyles = React.useMemo(() => generator(theme, componentProps), [generator, theme, componentProps]);

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

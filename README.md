# @reillymc/react-native-components

A collection of React Native components with a typed palette and component theme system.

## Installation

```sh
npm install @reillymc/react-native-components
```

Install the peer dependencies required by the components you use:

```sh
npm install react-native-gesture-handler react-native-reanimated \
  react-native-safe-area-context react-native-screens react-native-svg \
  react-native-worklets
```

## Quick start

Create an app theme once, then use the generated provider and style helper:

```tsx
import { View } from "react-native";
import { Text } from "@reillymc/react-native-components/typography";
import {
    type AppThemeFactory,
    createAppTheme,
} from "@reillymc/react-native-components/theme";

type AppTheme = {
    screen: {
        padding: number;
    };
};

const createAppThemeValues: AppThemeFactory<AppTheme> = ({ palette }) => ({
    screen: {
        padding: palette.spacing.medium,
    },
});

export const { AppThemeProvider, defineStyles, useStyles } =
    createAppTheme<AppTheme>(createAppThemeValues);

const createStyles = defineStyles(({ appTheme }) => ({
    screen: {
        flex: 1,
        padding: appTheme.screen.padding,
    },
}));

const Screen = () => {
    const styles = useStyles(createStyles);

    return (
        <View style={styles.screen}>
            <Text>Hello</Text>
        </View>
    );
};

export const App = () => (
    <AppThemeProvider>
        <Screen />
    </AppThemeProvider>
);
```

Components have working defaults and can render without the provider, but use `AppThemeProvider` so palette, component theme, shared system defaults, and icon overrides are consistent.

## Overrides

`AppThemeProvider` accepts `palette`, `theme`, `systems`, and `icons` overrides:

```tsx
import { darkColorScheme } from "@reillymc/react-native-components/theme";

const palette = { color: darkColorScheme };

<AppThemeProvider
    palette={palette}
    theme={{ iconBase: { size: 24 } }}
    systems={{
        interaction: { disabled: { opacity: 0.4 } },
        accessibility: { maxFontSizeMultiplier: 1.4 },
    }}
>
    <App />
</AppThemeProvider>;
```

Component theme overrides cascade into derived component themes. For one-off overrides, pass `theme` to the component; native styles still go through `style`:

```tsx
<Button
    label="Save"
    theme={{ container: { borderRadius: 12 } }}
    style={{ marginTop: 8 }}
/>
```

Keep provider objects stable (module scope or memoized) so the theme is not rebuilt on every render.

## Public entry points

- `@reillymc/react-native-components/actions`
- `@reillymc/react-native-components/display`
- `@reillymc/react-native-components/feedback`
- `@reillymc/react-native-components/forms`
- `@reillymc/react-native-components/layout`
- `@reillymc/react-native-components/overlays`
- `@reillymc/react-native-components/typography`
- `@reillymc/react-native-components/icons`
- `@reillymc/react-native-components/theme`

## License

MIT

# @reillymc/react-native-components

A collection of React Native components with a palette -> component theme system.

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

## Usage

```tsx
import { Button } from "@reillymc/react-native-components/components";
import { ThemeProvider } from "@reillymc/react-native-components/providers";

export const App = () => (
    <ThemeProvider>
        <Button label="Save" />
    </ThemeProvider>
);
```

Components have working defaults and can be used outside a provider, but wrapping the app in `ThemeProvider` is recommended so palette/theme overrides are consistent.

## Theming model

There are three layers:

```text
Palette
  base tokens: color, font, spacing, border
        |
Theme
  component tokens: iconBase, icon, buttonBase, button, inputBase, ...
        |
Component `theme` prop
  per-instance component token overrides
```

Native React Native styles are passed through `style` (and wrapper-specific native props such as `containerStyle` where a component has multiple surfaces).

### Base palette

```tsx
import { ThemeProvider } from "@reillymc/react-native-components/providers";
import { darkColorScheme } from "@reillymc/react-native-components/theme";

<ThemeProvider
    palette={{
        color: darkColorScheme,
        spacing: { medium: 20 },
    }}
>
    <App />
</ThemeProvider>;
```

`usePalette()` reads the resolved base tokens.

### Component theme

```tsx
<Button
    theme={{ container: { borderRadius: 12 } }}
    style={{ marginTop: 8 }}
/>
```

`theme` overrides component tokens. `style` remains a React Native style.

Use `useTheme()` to read the resolved component theme:

```tsx
const { iconBase } = useTheme();
```

### Cascade

Base component theme overrides cascade into derived component themes:

```tsx
<ThemeProvider theme={{ iconBase: { size: 24 } }}>
    <App />
</ThemeProvider>
```

This updates the resolved `icon`, `iconButton`, `iconButtonBase`, `toggleInput`, and other derived themes that depend on `iconBase`.

The same pattern is available to app components:

```tsx
import { useComponentTheme } from "@reillymc/react-native-components/hooks";
import { IconBase } from "@reillymc/react-native-components/components";

export const AppFeatureIcon = (props) => {
    const iconBase = useComponentTheme("iconBase");

    return (
        <IconBase
            {...props}
            size={iconBase.size * 1.5}
            color={iconBase.color}
        />
    );
};
```

### App-owned styles

App-specific styles stay in the app. Build them from the palette and component theme:

```tsx
import { StyleSheet } from "react-native";
import { usePalette, useThemedStyles } from "@reillymc/react-native-components/hooks";

const styles = useThemedStyles(({ palette, theme }) =>
    StyleSheet.create({
        page: {
            backgroundColor: palette.color.background,
            padding: palette.spacing.medium,
        },
        featureIcon: {
            color: theme.iconBase.color,
        },
    }),
);
```

No app tokens need to be merged into the library palette or theme.

### Icons

```tsx
import { useIcons } from "@reillymc/react-native-components/hooks";

const icons = useIcons();
```

Override icon assets through the provider:

```tsx
<ThemeProvider icons={{ inputScaffold: { error: { iconSet: MyIcons, iconName: "alert" } } }}>
    <App />
</ThemeProvider>
```

## Public entry points

- `@reillymc/react-native-components/components`
- `@reillymc/react-native-components/hooks`
- `@reillymc/react-native-components/providers`
- `@reillymc/react-native-components/theme`
- `@reillymc/react-native-components/icons`
- `@reillymc/react-native-components/common`

## Contributing

See the contributing guide referenced by the repository (if present) for the development workflow.

## Publishing

This package is published to npm. New versions are published from `latest/*` branches through the GitHub workflow in `.github/workflows/publish.yml`.

## Running locally

To generate the Expo Go QR code which correctly links to the Metro server, set `REACT_NATIVE_PACKAGER_HOSTNAME` in the dev container `.env` file. See `.devcontainer/.env.example`.

## License

MIT

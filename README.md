# @reillymc/react-native-components

@reillymc/react-native-components

## Installation

```sh
npm install @reillymc/react-native-components
```

## Usage

```js
import { Button } from "@reillymc/react-native-components/components";
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Publishing

This package is published to npm.

New package versions are published automatically via the [publish](.github/workflows/publish.yml) GitHub workflow. A [pre-commit hook](.git/hooks/pre-commit) increments the patch version each commit automatically, while minor/major branches are created manually.

### Running Locally

To generate the Expo Go QR code which correctly links to the Metro server, the `REACT_NATIVE_PACKAGER_HOSTNAME` variable in the dev container [.env](.devcontainer/.env) file must be set. An example is provided.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

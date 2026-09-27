/**
 * Babel config for the published library build only.
 */
module.exports = (api) => {
    api.cache(true);

    return {
        presets: [
            [
                require.resolve("@react-native/babel-preset"),
                {
                    // Preserve ESM
                    disableImportExportTransform: true,
                    // Inline Babel helpers instead of emitting `@babel/runtime`
                    // requires, which is not a declared dependency.
                    enableBabelRuntime: false,
                },
            ],
        ],
        plugins: [
            // React Compiler must run first.
            [require.resolve("babel-plugin-react-compiler"), { target: "19" }],
            // Worklets must run last.
            require.resolve("react-native-worklets/plugin"),
        ],
    };
};

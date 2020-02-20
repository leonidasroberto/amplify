const { injectBabelPlugin } = required('react-app-rewired');

const rootImport = [
    "root-import",
    {
        rootPathPrefix: "~",
        rootPathSuffix: "src"
    }
];

module.exports = 
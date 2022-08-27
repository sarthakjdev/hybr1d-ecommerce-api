module.exports = {
    env: {
        es2021: true,
        node: true,
        jest: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["./tsconfig.json"],
        ecmaVersion: 2021,
    },
    extends: [
        "eslint:recommended",
        "airbnb-base",
        "airbnb-typescript/base",
        "plugin:@typescript-eslint/recommended",
    ],
    plugins: ["import"],
    rules: {
        "import/extensions": [
            "warn",
            {
                ts: true,
                js: true,
                json: true,
            },
        ],
        "no-underscore-dangle": "off",
        "array-callback-return": "off",
        "newline-before-return": "error",
        "consistent-return": "off",
        "@typescript-eslint/naming-convention": "off",
        "no-else-return": ["error", { allowElseIf: false }],
        "class-methods-use-this": "off",
        indent: ["error", 4, { SwitchCase: 1 }],
        "@typescript-eslint/indent": ["error", 4, { SwitchCase: 1 }],
        semi: ["error", "never"],
        "@typescript-eslint/semi": ["error", "never"],
        "no-multiple-empty-lines": ["error", { max: 1 }],
        "max-len": "off",
        "new-cap": [
            "error",
            {
                newIsCap: false,
                capIsNew: false,
                properties: true,
            },
        ],
        "padded-blocks": ["error", "never", { allowSingleLineBlocks: true }],
        quotes: [
            "error",
            "single",
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        "prefer-const": "error",
    },
};

module.exports = {
    "root": true,
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": "@typescript-eslint/parser",
    },
    "env": {
        "browser": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/recommended",
        "@vue/typescript",
    ],
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "vue/no-v-html": "off",
        "vue/component-tags-order": "off",
        "no-undef": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off"
    },
}

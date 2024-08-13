module.exports = {
    env: {
        node: true,
        es2021: true,
        jest: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
};
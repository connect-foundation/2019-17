module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['airbnb-base', 'plugin:@typescript-eslint/eslint-recommended'],
    rule: {
      'no-console': false,
      'member-access': false,
      'object-literal-sort-keys': false,
      'ordered-imports': false,
      'interface-name': false,
      'strict-null-checks': false
    }
  };
  
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    // Error prevention
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-undef': 'error',
    
    // Code style
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    
    // Best practices
    'prefer-const': 'error',
    'no-var': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    
    // Security
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    
    // Async/await
    'require-await': 'error',
    'no-async-promise-executor': 'error',
  },
  globals: {
    process: 'readonly',
    __dirname: 'readonly',
    __filename: 'readonly',
  },
  overrides: [
    {
      files: ["**/__tests__/**/*.js", "**/*.test.js"],
      env: {
        jest: true,
        es2022: true
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module"
      }
    }
  ]
}; 
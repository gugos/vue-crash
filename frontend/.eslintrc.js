module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },

    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],

    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },

    "plugins": [
        "vue"
    ],

    "rules": {
    },

    overrides: [
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
          jest: true
        }
      }
    ]
};

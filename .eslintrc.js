module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
     "plugins": [
        "react"
    ],
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
        }
    },
    "env" : {
        "browser": true
    }
};
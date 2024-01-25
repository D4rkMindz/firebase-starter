"use strict";
exports.__esModule = true;
exports["default"] = {
    theme: {
        extend: {}
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                    "primary": "#4c1d95",
                    "secondary": "#7e22ce",
                },
            },
            {
                dark: {
                    ...require("daisyui/src/theming/themes")["dark"],
                    "primary": "#4c1d95",
                    "secondary": "#7e22ce",
                },
            },
            "cyberpunk",
        ],
        styled: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "dark"
    }
};

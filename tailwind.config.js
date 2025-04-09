/** @type {import('tailwindcss').Config} */

const { heroui } = require('@heroui/react');
const customTheme = require('./src/ui/custom-theme.json');

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#f0f9ff',
                    100: customTheme['color-primary-100'],
                    200: customTheme['color-primary-200'],
                    300: customTheme['color-primary-300'],
                    400: customTheme['color-primary-400'],
                    500: customTheme['color-primary-500'],
                    600: customTheme['color-primary-600'],
                    700: customTheme['color-primary-700'],
                    800: customTheme['color-primary-800'],
                    900: customTheme['color-primary-900'],
                },
            },
        },
    },
    darkMode: 'class',
    plugins: [
        // require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        heroui({
            themes: {
                light: {
                    colors: {
                        primary: {
                            DEFAULT: customTheme['color-primary-500'],
                        },
                        secondary: {
                            DEFAULT: customTheme['color-secondary-500'],
                        },
                        success: {
                            DEFAULT: customTheme['color-success-500'],
                        },
                        // info: {
                        //     DEFAULT: customTheme['color-info-500'],
                        // },
                        warning: {
                            DEFAULT: customTheme['color-warning-500'],
                        },
                        danger: {
                            DEFAULT: customTheme['color-danger-500'],
                        },
                    },
                },
            },
        }),
    ],
};

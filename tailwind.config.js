/** @type {import('tailwindcss').Config} */
export default {
    content: ['index.html', './src/**/*.{html,js,vue}'],
    theme: {
        extend: {
            colors: {
                dark: '#082329',
                mediumdark: '#0b4651',
                medium: '#429698',
                mediumlight: '#bdd1bd',
                light: '#dfebec',
            },
            borderRadius: {
                'mega-xl': '4em',
                'somewhat-mega-xl': '2.5em',
            },
            width: {
                '15percent': '15%',
            },
        },
    },
    plugins: [],
};

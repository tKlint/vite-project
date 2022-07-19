module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        theme: {
            spacing: {
                1: '4px',
                2: '8px',
                3: '16px',
                4: '24px',
                5: '32px',
                6: '48px'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
};

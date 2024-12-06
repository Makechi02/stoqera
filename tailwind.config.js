/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#14B8A6',      // Teal
                accent: '#F97316',       // Orange
                secondary: '#4B5563',    // Neutral Gray
                background: '#FAF8F6',   // Light Cream
                text: '#1F2937',         // Dark Charcoal
                error: '#DC2626',        // Crimson
                surface: '#111827'
            },
            fontFamily: {
                figtree: ['var(--font-figtree), sans-serif'],
                gfs_didot: ['var(--font-gfs_didot), serif']
            }
        },
    },
    plugins: [],
};

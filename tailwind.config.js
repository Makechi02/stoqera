/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0F766E',      // Darker Teal (better contrast)
                accent: '#EA580C',       // Slightly darker Orange (better contrast)
                secondary: '#4B5563',    // Neutral Gray
                background: '#F8FAFC',   // Slightly cooler light background
                text: '#0F172A',         // Near-black for maximum readability
                error: '#B91C1C',        // Slightly darker Crimson (better contrast)
                surface: '#0F172A'       // very dark blue-gray for surfaces
            },
            fontFamily: {
                figtree: ['var(--font-figtree), sans-serif'],
                gfs_didot: ['var(--font-gfs_didot), serif']
            }
        },
    },
    plugins: [],
};

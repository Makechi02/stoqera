import {Figtree, GFS_Didot} from "next/font/google";

export const figtree_init = Figtree({
    subsets: ['latin'],
    display: 'swap',
    variable: "--font-figtree"
});

export const gfs_didot_init = GFS_Didot({
    subsets: ['greek'],
    display: 'swap',
    variable: "--font-gfs_didot",
    weight: '400'
});

export const figtree = figtree_init.variable;
export const gfs_didot = gfs_didot_init.variable;
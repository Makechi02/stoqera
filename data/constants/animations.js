export const fadeIn = {
    initial: {opacity: 0, y: 20},
    whileInView: {opacity: 1, y: 0},
    viewport: {once: true},
    transition: {duration: 0.5, ease: 'easeOut'}
};

export const fadeInUp = {
    initial: {opacity: 0, y: 20},
    animate: {opacity: 1, y: 0},
    transition: {duration: 0.6}
};
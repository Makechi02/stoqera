export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/accounts', '/dashboard', '/admin', '/api', '/platform', '/confirm'],
        },
        sitemap: 'https://stoqera.co.ke/sitemap.xml',
    }
}
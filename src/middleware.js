import {getToken} from 'next-auth/jwt';
import {NextResponse} from 'next/server';

export async function middleware(request) {
    const session = await getToken({req: request});

    const loginUrl = new URL('/accounts/login', request.url);
    const homeUrl = new URL('/', request.url);

    if (!session) {
        if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/dashboard')) {
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    const {user} = session;

    if (request.nextUrl.pathname.startsWith('/admin') && user.role !== 'ADMIN') {
        return NextResponse.redirect(homeUrl);
    }

    if (request.nextUrl.pathname === '/accounts/login') {
        const dashboardUrl = user.role === 'ADMIN' ? new URL('/admin', request.url) : new URL('/dashboard', request.url);

        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/accounts/login',
        '/admin/:path*',
        '/dashboard/:path*',
    ],
};

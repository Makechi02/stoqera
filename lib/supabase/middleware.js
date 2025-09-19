import {createServerClient} from '@supabase/ssr'
import {NextResponse} from 'next/server'
import {getCurrentLoggedInUser} from "@/lib/queryUsers";

export async function updateSession(request) {
    let supabaseResponse = NextResponse.next({request})

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({name, value, options}) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({request})
                    cookiesToSet.forEach(({name, value, options}) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: DO NOT REMOVE auth.getUser()

    const {data: {user}} = await supabase.auth.getUser();

    const authRoutes = ['/account', '/dashboard', '/platform'];

    // If trying to access protected route without session
    if (authRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
        if (!user) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = '/login';
            redirectUrl.searchParams.set('redirected_from', request.nextUrl.pathname);
            return NextResponse.redirect(redirectUrl);
        }
    }

    if (user) {
        const currentUser = await getCurrentLoggedInUser();

        // role-based access control
        const pathname = request.nextUrl.pathname;

        // If on login, redirect based on role
        if (pathname === '/login') {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = currentUser?.role === 'superadmin' ? '/platform' : '/dashboard';
            return NextResponse.redirect(redirectUrl);
        }

        if (currentUser?.role === 'superadmin') {
            // Superadmin cannot access dashboard routes
            if (pathname.startsWith('/dashboard')) {
                const redirectUrl = request.nextUrl.clone();
                redirectUrl.pathname = '/platform';
                return NextResponse.redirect(redirectUrl);
            }
        } else {
            // Normal users cannot access platform routes
            if (pathname.startsWith('/platform')) {
                const redirectUrl = request.nextUrl.clone();
                redirectUrl.pathname = '/dashboard';
                return NextResponse.redirect(redirectUrl);
            }
        }
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is.
    // If you're creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse
}
import { NextResponse } from 'next/server';

export async function middleware(request) {
    try {
        const authToken = await request.cookies.get("userToken")?.value;
        const isScreenshotRequest = request.headers.get('x-screenshot') === 'true'; // Check for custom header
        // console.log('Auth Token:', authToken);

        if (!authToken && !isScreenshotRequest) {
            console.log('Redirecting to login');
            return NextResponse.redirect(new URL('/login', request.url));
        } else {
            console.log('Allowing access to profile');
            return NextResponse.next();
        }
        
    } catch (error) {
        console.error('Middleware Error:', error);
        return NextResponse.redirect(new URL('/error', request.url));
    }
}

export const config = {
    matcher: [
        '/profile/:path*'
    ],
};

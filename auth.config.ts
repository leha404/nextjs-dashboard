import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            // DEBUG for seeding
            // if (nextUrl.pathname.startsWith('/seed')) {
            //     return true;
            // }
            
            const isLoggedIn = !!auth?.user;
            const isOnTasks = nextUrl.pathname.startsWith('/dashboard/tasks');
            if (isOnTasks) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard/tasks', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
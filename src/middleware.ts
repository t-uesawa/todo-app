/**
 * Clerkのミドルウェア
 * Cookieに保存されたJWTを検証することで認証する
 */

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

// 認証不要のルーティング
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, req) => {
	const user = (await auth()).userId;

	// 認証不要のルーティングは認証をスキップ
	if (isPublicRoute(req)) {
		if (user) {
			return NextResponse.redirect(new URL('/taskList', req.url));
		}
		return;
	}

	// 認証が必要なルーティングは認証を要求
	await auth.protect();
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
}
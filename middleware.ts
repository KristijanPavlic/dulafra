import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextFetchEvent, NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { i18n } from '@/i18n.config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith('/en/sign-in') ||
    pathname.startsWith('/en/dashboard')
  ) {
    return NextResponse.redirect(new URL(`/hr/sign-in`, request.url));
  }

  if (
    pathname.startsWith('/hr/sign-in') ||
    pathname.startsWith('/hr/dashboard')
  ) {
    const isProtectedRoute = createRouteMatcher(["hr/dashboard(.*)"]);
    // Apply authMiddleware for specific routes
    return clerkMiddleware((auth, req) => {
      if (isProtectedRoute(req)) auth().protect();
    })(request, event);
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Redirect if there is no locale
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

/* export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
}); */

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

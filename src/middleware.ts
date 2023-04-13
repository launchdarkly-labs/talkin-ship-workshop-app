import { NextRequest, NextResponse } from "next/server";

// Limit middleware pathname config
export const config = {
  matcher: "/:path*",
};

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  const country = geo.country || "US";

  if (!req.nextUrl.searchParams.get("country"))
    url.searchParams.set("country", country);

  return NextResponse.rewrite(url);
}

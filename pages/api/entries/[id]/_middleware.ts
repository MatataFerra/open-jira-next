import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const id = req.page.params?.id || "";

  const checkMongoIdRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  if (!checkMongoIdRegExp.test(id)) {
    // return res.status(400).json({ message: "Invalid id" });
    return new Response(JSON.stringify({ message: "Invalid id" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return NextResponse.next();
}

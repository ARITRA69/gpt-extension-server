import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log("aye nigga")
    return NextResponse.json({ output: "Hello World" }, { status: 200 })
}

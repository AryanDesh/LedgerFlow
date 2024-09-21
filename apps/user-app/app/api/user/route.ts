import { NextResponse } from "next/server";
import { client } from "@repo/db/client"; // assuming `client` is the exported instance

export const GET = async () => {
    await client.user.create({
        data: {
            email: "asdc",
            name: "adsadsc"
        }
    });
    return NextResponse.json({
        message: "hi there"
    });
};

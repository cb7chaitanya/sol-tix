import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {  
        const { email  } = await req.json()
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return NextResponse.json({
            message: "User fetched successfully",
            success: true,
            user
        })
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch user",
            success: false
        })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { linkedinUrl, twitterUrl, email } = await req.json()
        const user = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                linkedinUrl: linkedinUrl,
                twitterUrl: twitterUrl
            }
        })
        return NextResponse.json({
            message: "User updated successfully",
            success: true,
            user
        })
    } catch (error) {
        return NextResponse.json({
            message: "Failed to update user",
            success: false
        })
    }
}
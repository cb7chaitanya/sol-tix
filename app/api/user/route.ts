import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {  
        const { email } = await req.json()
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
        console.log(error)
        return NextResponse.json({
            message: "Failed to fetch user by Id",
            success: false
        })
    }
}
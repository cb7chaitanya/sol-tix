import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url)
        const id = url.searchParams.get('id') as string 
        const event = await prisma.event.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            message: "Event fetched successfully",
            success: true,
            event
        })
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch event",
            success: false
        })
    }
}
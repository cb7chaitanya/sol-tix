import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try{
        const events = await prisma.event.findMany()
        return NextResponse.json({
            message: "Events fetched successfully",
            success: true,
            events
        })
    } catch(error){
        return NextResponse.json({
            message: "Failed to fetch events", 
            success: false
        })
    }
}

export async function POST(req: NextRequest) {
    const { name, description, image, capacity, startDate, endDate, isPaid, UTCOFFset, isVirtual, ticketPrice, location, requireApproval, publicStatus, zoomAddress } = await req.json()
    try {
        const event = await prisma.event.create({
            data: {
                name: name,
                description:description,
                image: image,
                capacity: capacity,
                startDate: startDate,
                endDate: endDate,
                isPaid: isPaid,
                UTCOFFset: UTCOFFset,
                isVirtual: isVirtual,
                ticketPrice: isPaid ? ticketPrice : null,
                location: isVirtual ? null : location,
                requireApproval: requireApproval,
                publicStatus: publicStatus,
                zoomAddress: isVirtual ? zoomAddress : null
            }
        })
        return NextResponse.json({
            message: "Event created successfully",
            success: true,
            event
        })
    } catch(error) {
        return NextResponse.json({
            message: "Failed to create event",
            success: false
        })
    }
}
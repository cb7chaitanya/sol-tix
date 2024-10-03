import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
})

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

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: name,
            Body: image,
        }
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        
        const getObjectParams = {
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: name
        }
        const signedUrlCommand = new GetObjectCommand(getObjectParams);
        const signedUrl = await getSignedUrl(s3Client, signedUrlCommand, { expiresIn: 0 });

        const event = await prisma.event.create({
            data: {
                name: name,
                description:description,
                image: signedUrl,
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
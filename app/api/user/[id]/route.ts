import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
      const url = req.nextUrl.pathname;
      const id = url.substring(url.lastIndexOf("/") + 1);
      if (!id || typeof id !== "string") {
        return NextResponse.json({
          message: "Invalid ID",
          success: false,
        });
      }
  
      const events = await prisma.user.findUnique({
        where: { id },
        select: {
          eventsAttended: true,
          eventsHosted: true,
        },
      });
  
      if (!events) {
        return NextResponse.json({
          message: "User not found",
          success: false,
        });
      }
  
      return NextResponse.json({
        message: "User fetched successfully",
        success: true,
        events,
      });
    } catch (error) {
      return NextResponse.json({
        message: "Failed to fetch user",
        success: false,
      });
    }
  }
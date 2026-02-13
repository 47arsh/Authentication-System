import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function GET(request: NextRequest) {
    try {

        // Get user ID from token using helper
        const userId = getDataFromToken(request);

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Fetch user from database
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Return user data
        return NextResponse.json({
            message: "User fetched successfully",
            success: true,
            data: user,
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: "Invalid token" },
            { status: 401 }
        );
    }
}

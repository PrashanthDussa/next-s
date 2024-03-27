// Import necessary modules
import jwt from 'jsonwebtoken';
import User from '@/models/userModel'; // Assuming this is your user model
import { NextRequest, NextResponse } from 'next/server';

// Define the handler function for the /api/users/me endpoint
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        // Retrieve the token from the request cookies
        const token = req.cookies.get('token')?.value;

        // If no token is found, return a 401 Unauthorized response
        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Verify the token and extract the user's ID
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);

        // Find the user in the database using the user ID from the token
        const user = await User.findById(decodedToken.id).select('-password');

        // If user is not found, return a 404 Not Found response
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // If user is found, return the user data as a JSON response
        return NextResponse.json({ user });
    } catch (error: any) {
        // If any error occurs during the process, return a 500 Internal Server Error response
        console.error('Error fetching user data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

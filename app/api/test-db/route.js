import connectDB from '@/lib/db/connect';
import { NextResponse } from 'next/server';

export async function GET() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({
      status: 'error',
      message: 'MONGODB_URI is not set in .env.local',
    }, { status: 500 });
  }

  const isPlaceholder =
    uri.includes('your_username') ||
    uri.includes('your_password') ||
    uri.includes('your_cluster');

  if (isPlaceholder) {
    return NextResponse.json({
      status: 'error',
      message:
        'MONGODB_URI is still the placeholder value. Please replace it with your real MongoDB connection string in portfolio/.env.local',
    }, { status: 500 });
  }

  try {
    await connectDB();
    return NextResponse.json({
      status: 'ok',
      message: 'MongoDB connected successfully',
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
    }, { status: 500 });
  }
}

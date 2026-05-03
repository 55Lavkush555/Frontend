import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    const project = await Project.findOne({ slug });
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    project.featured = !project.featured;
    await project.save();

    return NextResponse.json({ project });
  } catch (error) {
    console.error('[PATCH /api/project/[slug]/featured]', error);
    return NextResponse.json({ error: error.message || 'Failed to toggle featured' }, { status: 500 });
  }
}

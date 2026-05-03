import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { name, imageUrl, description, githubUrl, liveUrl } = body;
    const project = await Project.findOneAndUpdate(
      { slug },
      {
        name: name?.trim(),
        imageUrl: imageUrl || '',
        description: description?.trim(),
        githubUrl: githubUrl || '',
        liveUrl: liveUrl || '',
      },
      { new: true, runValidators: true }
    );

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('[PUT /api/project/[slug]]', error);
    return NextResponse.json({ error: error.message || 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    const project = await Project.findOneAndDelete({ slug });
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('[DELETE /api/project/[slug]]', error);
    return NextResponse.json({ error: error.message || 'Failed to delete project' }, { status: 500 });
  }
}

import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
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

    const { title, imageUrl, content } = body;
    const blog = await Blog.findOneAndUpdate(
      { slug },
      {
        title: title?.trim(),
        imageUrl: imageUrl || '',
        content: content?.trim(),
      },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error('[PUT /api/blog/[slug]]', error);
    return NextResponse.json({ error: error.message || 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    const blog = await Blog.findOneAndDelete({ slug });
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Blog deleted' });
  } catch (error) {
    console.error('[DELETE /api/blog/[slug]]', error);
    return NextResponse.json({ error: error.message || 'Failed to delete blog' }, { status: 500 });
  }
}

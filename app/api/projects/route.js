import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { NextResponse } from 'next/server';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    const query = {};
    if (featured === 'true') query.featured = true;

    const projects = await Project.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('[GET /api/projects]', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { name, imageUrl, description, githubUrl, liveUrl, featured } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }
    if (!description || !description.trim()) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    let slug = slugify(name);
    const existing = await Project.findOne({ slug }).lean();
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const project = await Project.create({
      name: name.trim(),
      slug,
      imageUrl: imageUrl || '',
      description: description.trim(),
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      featured: !!featured,
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/projects]', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to create project' },
      { status: 500 }
    );
  }
}

import connectDB from '@/lib/db/connect';
import Project from '@/lib/models/Project';
import { slugify } from '@/lib/utils/slugify';
import { ok, fail } from '@/lib/utils/apiResponse';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('featured') === 'true' ? { featured: true } : {};
    const projects = await Project.find(query).sort({ createdAt: -1 }).lean();
    return ok({ projects });
  } catch (err) {
    console.error('[GET /api/projects]', err.message);
    return fail(err.message || 'Failed to fetch projects');
  }
}

export async function POST(request) {
  try {
    await connectDB();

    let body;
    try { body = await request.json(); }
    catch { return fail('Invalid JSON body', 400); }

    const { name, imageUrl, description, githubUrl, liveUrl, featured } = body;
    if (!name?.trim()) return fail('Project name is required', 400);
    if (!description?.trim()) return fail('Description is required', 400);

    let slug = slugify(name);
    if (await Project.findOne({ slug }).lean()) slug = `${slug}-${Date.now()}`;

    const project = await Project.create({
      name: name.trim(),
      slug,
      imageUrl: imageUrl || '',
      description: description.trim(),
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      featured: !!featured,
    });

    return ok({ project }, 201);
  } catch (err) {
    console.error('[POST /api/projects]', err.message);
    return fail(err.message || 'Failed to create project');
  }
}

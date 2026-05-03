import connectDB from '@/lib/db/connect';
import Project from '@/lib/models/Project';
import { ok, fail } from '@/lib/utils/apiResponse';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    const project = await Project.findOne({ slug }).lean();
    if (!project) return fail('Project not found', 404);
    return ok({ project });
  } catch (err) {
    console.error('[GET /api/projects/:slug]', err.message);
    return fail(err.message || 'Failed to fetch project');
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();

    let body;
    try { body = await request.json(); }
    catch { return fail('Invalid JSON body', 400); }

    const { name, imageUrl, description, githubUrl, liveUrl } = body;
    if (!name?.trim()) return fail('Project name is required', 400);
    if (!description?.trim()) return fail('Description is required', 400);

    const project = await Project.findOneAndUpdate(
      { slug },
      {
        name: name.trim(),
        imageUrl: imageUrl || '',
        description: description.trim(),
        githubUrl: githubUrl || '',
        liveUrl: liveUrl || '',
      },
      { new: true, runValidators: true }
    );
    if (!project) return fail('Project not found', 404);
    return ok({ project });
  } catch (err) {
    console.error('[PUT /api/projects/:slug]', err.message);
    return fail(err.message || 'Failed to update project');
  }
}

export async function PATCH(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();

    const project = await Project.findOne({ slug });
    if (!project) return fail('Project not found', 404);

    project.featured = !project.featured;
    await project.save();
    return ok({ project });
  } catch (err) {
    console.error('[PATCH /api/projects/:slug]', err.message);
    return fail(err.message || 'Failed to toggle featured');
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    const project = await Project.findOneAndDelete({ slug });
    if (!project) return fail('Project not found', 404);
    return ok({ message: 'Project deleted' });
  } catch (err) {
    console.error('[DELETE /api/projects/:slug]', err.message);
    return fail(err.message || 'Failed to delete project');
  }
}

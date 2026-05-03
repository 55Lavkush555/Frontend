import connectDB from '@/lib/db/connect';
import Blog from '@/lib/models/Blog';
import { ok, fail } from '@/lib/utils/apiResponse';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) return fail('Blog not found', 404);
    return ok({ blog });
  } catch (err) {
    console.error('[GET /api/blogs/:slug]', err.message);
    return fail(err.message || 'Failed to fetch blog');
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();

    let body;
    try { body = await request.json(); }
    catch { return fail('Invalid JSON body', 400); }

    const { title, imageUrl, content } = body;
    if (!title?.trim()) return fail('Title is required', 400);
    if (!content?.trim()) return fail('Content is required', 400);

    const blog = await Blog.findOneAndUpdate(
      { slug },
      { title: title.trim(), imageUrl: imageUrl || '', content: content.trim() },
      { new: true, runValidators: true }
    );
    if (!blog) return fail('Blog not found', 404);
    return ok({ blog });
  } catch (err) {
    console.error('[PUT /api/blogs/:slug]', err.message);
    return fail(err.message || 'Failed to update blog');
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    const blog = await Blog.findOneAndDelete({ slug });
    if (!blog) return fail('Blog not found', 404);
    return ok({ message: 'Blog deleted' });
  } catch (err) {
    console.error('[DELETE /api/blogs/:slug]', err.message);
    return fail(err.message || 'Failed to delete blog');
  }
}

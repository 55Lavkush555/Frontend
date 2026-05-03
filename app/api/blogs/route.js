import connectDB from '@/lib/db/connect';
import Blog from '@/lib/models/Blog';
import { slugify } from '@/lib/utils/slugify';
import { ok, fail } from '@/lib/utils/apiResponse';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return ok({ blogs });
  } catch (err) {
    console.error('[GET /api/blogs]', err.message);
    return fail(err.message || 'Failed to fetch blogs');
  }
}

export async function POST(request) {
  try {
    await connectDB();

    let body;
    try { body = await request.json(); }
    catch { return fail('Invalid JSON body', 400); }

    const { title, imageUrl, content } = body;
    if (!title?.trim()) return fail('Title is required', 400);
    if (!content?.trim()) return fail('Content is required', 400);

    let slug = slugify(title);
    if (await Blog.findOne({ slug }).lean()) slug = `${slug}-${Date.now()}`;

    const blog = await Blog.create({
      title: title.trim(),
      slug,
      imageUrl: imageUrl || '',
      content: content.trim(),
    });

    return ok({ blog }, 201);
  } catch (err) {
    console.error('[POST /api/blogs]', err.message);
    return fail(err.message || 'Failed to create blog');
  }
}

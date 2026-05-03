import connectDB from '@/lib/db/connect';
import Blog from '@/lib/models/Blog';

export async function getAllBlogs() {
  try {
    await connectDB();
    return await Blog.find({}).sort({ createdAt: -1 }).lean();
  } catch (err) {
    console.error('[blogService.getAllBlogs]', err.message);
    return [];
  }
}

export async function getRecentBlogs(limit = 3) {
  try {
    await connectDB();
    return await Blog.find({}).sort({ createdAt: -1 }).limit(limit).lean();
  } catch (err) {
    console.error('[blogService.getRecentBlogs]', err.message);
    return [];
  }
}

export async function getBlogBySlug(slug) {
  try {
    await connectDB();
    return await Blog.findOne({ slug }).lean();
  } catch (err) {
    console.error('[blogService.getBlogBySlug]', err.message);
    return null;
  }
}

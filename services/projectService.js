import connectDB from '@/lib/db/connect';
import Project from '@/lib/models/Project';

export async function getAllProjects() {
  try {
    await connectDB();
    return await Project.find({}).sort({ createdAt: -1 }).lean();
  } catch (err) {
    console.error('[projectService.getAllProjects]', err.message);
    return [];
  }
}

export async function getFeaturedProjects() {
  try {
    await connectDB();
    return await Project.find({ featured: true }).sort({ createdAt: -1 }).lean();
  } catch (err) {
    console.error('[projectService.getFeaturedProjects]', err.message);
    return [];
  }
}

export async function getProjectBySlug(slug) {
  try {
    await connectDB();
    return await Project.findOne({ slug }).lean();
  } catch (err) {
    console.error('[projectService.getProjectBySlug]', err.message);
    return null;
  }
}

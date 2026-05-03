import connectDB from '@/lib/db/connect';
import Message from '@/lib/models/Message';
import { ok, fail } from '@/lib/utils/apiResponse';

export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find({}).sort({ createdAt: -1 }).lean();
    return ok({ messages });
  } catch (err) {
    console.error('[GET /api/messages]', err.message);
    return fail(err.message || 'Failed to fetch messages');
  }
}

export async function POST(request) {
  try {
    await connectDB();

    let body;
    try { body = await request.json(); }
    catch { return fail('Invalid JSON body', 400); }

    const { name, email, message } = body;
    if (!name?.trim()) return fail('Name is required', 400);
    if (!email?.trim()) return fail('Email is required', 400);
    if (!message?.trim()) return fail('Message is required', 400);

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return ok({ message: newMessage }, 201);
  } catch (err) {
    console.error('[POST /api/messages]', err.message);
    return fail(err.message || 'Failed to send message');
  }
}

export async function PATCH(request) {
  try {
    await connectDB();

    let body;
    try { body = await request.json(); }
    catch { return fail('Invalid JSON body', 400); }

    const { id } = body;
    if (!id) return fail('Message ID is required', 400);

    await Message.findByIdAndUpdate(id, { read: true });
    return ok({ message: 'Marked as read' });
  } catch (err) {
    console.error('[PATCH /api/messages]', err.message);
    return fail(err.message || 'Failed to update message');
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return fail('Message ID is required', 400);

    await Message.findByIdAndDelete(id);
    return ok({ message: 'Message deleted' });
  } catch (err) {
    console.error('[DELETE /api/messages]', err.message);
    return fail(err.message || 'Failed to delete message');
  }
}

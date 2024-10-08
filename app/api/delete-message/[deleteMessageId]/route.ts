import UserModel from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { User } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import mongoose from 'mongoose';

export async function DELETE(
  request: Request,
  { params }: { params: { deleteMessageId: string } }
) {
  const messageIdString = params.deleteMessageId;
  console.log(`params: ${JSON.stringify(params)}`)
  console.log(`messageID from param: ${messageIdString}`)
  const messageId = new mongoose.Types.ObjectId(messageIdString);
  
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;
  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }
  
  console.log(`user: ${_user._id}`)
  console.log(messageId)

  try {
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageId } } }
    );
    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { message: 'Message not found or already deleted', success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: 'Message deleted', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { message: 'Error deleting message', success: false },
      { status: 500 }
    );
  }
}

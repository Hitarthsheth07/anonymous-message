import dbconnect from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User";
import {User} from 'next-auth'

export async function POST(req: Request) {
  await dbconnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  // (!session || !session.user)
  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { isAcceptingMessages } = await req.json();
  console.log(`setting isAcceptingMessage to: ${isAcceptingMessages}`)

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages },
      { new: true } // returns the updated user
    );

    console.log(`updatedUser: ${updatedUser}`)
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update messaging status",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message status updates successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating message status" + error);
    {
      return Response.json(
        {
          success: false,
          message: "Error updating message status",
        },
        { status: 500 }
      );
    }
  }
}

export async function GET(req: Request) {
  await dbconnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  // (!session || !session.user)
  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  
try {
    const foundUser = await UserModel.findById(userId)
    if(!foundUser){
      // console.log("Cannot find User");
      return Response.json(
          {
            success: false,
            message: "User not found",
          },
          { status: 404 }
        );
    }
  
    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages
      },
      { status: 200 }
    );
} catch (error) {
    // console.log("Error fetching message status");
    {
      return Response.json(
        {
          success: false,
          message: "Error updating message status",
        },
        { status: 500 }
      );
    }
}
}

import React from 'react';
import ChatForum from '@/app/Components/ChatForum';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { StreamChat } from 'stream-chat';

const Page = async ({ params }) => {

  const api_key='wm2zeyzvf32c';
  const api_secret = process.env.STREAM_API_SECRET;


  const user = await currentUser();
  if (!user) {
    console.log('No user found');
    return <div>Please log in.</div>;
  }

  // Fetch updated user details to ensure the token is present
  // const updatedUser = await clerkClient.users?.getUser(user.id);

  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(user.id);
  const slug = (await params).slug

  return (
    <div className="">
      <ChatForum slug={slug} clerkUser={{ id: user?.id, name: user?.firstName, token }} />
    </div>
  );
};

export default Page;

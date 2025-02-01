
import { StreamChat } from 'stream-chat';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(request) {
  const api_key = "wm2zeyzvf32cn";
  const api_secret = process.env.STREAM_API_SECRET;

  try {
    if (!api_key || !api_secret) {
      return new Response(
        JSON.stringify({ error: 'Missing Stream API credentials' }),
        { status: 500 }
      );
    }
    
    const user = await request.json();

    if (!user?.data?.id || typeof user.data.id !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid user ID. Expected a string.' }),
        { status: 400 }
      );
    }

    // Initialize Stream Chat server client
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    const token = serverClient.createToken(user.data.id);

    // Upsert the user in Stream Chat
    await serverClient.upsertUser({
      id: user.data.id,
      name: user.data.fullName || 'Anonymous',
      image: user?.data?.profileImageUrl || '',
    });

    // Update Clerk user metadata with the Stream Chat token
    await clerkClient.users.updateUserMetadata(user.data.id, {
      publicMetadata: {
        streamChatToken: token,
      },
    });

    // Create channels and add the user as a member
    const slugs = [
      'python-discuss',
      'js-discuss',
      'react-discuss',
      'nodejs-discuss',
      'ai-discuss',
      'dsa-discuss',
    ];

    for (const slug of slugs) {
      console.log(`Creating channel for slug: ${slug}`);

      try {
        const channel = serverClient.channel('messaging', slug, {
          image: 'https://getstream.io/random_png/?name=react',
          name: `${slug}`,
          created_by_id: user.data.id,
        });

        await channel.create();
        await channel.addMembers([user.data.id]);
        // Verify the members of the channel
      } catch (error) {
        console.error(`Error creating channel or adding members for ${slug}:`, error);
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Token generated and metadata updated', token }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate token or update metadata' }),
      { status: 500 }
    );
  }
}

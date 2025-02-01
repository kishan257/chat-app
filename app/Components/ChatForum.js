'use client';
import { useState, useEffect } from 'react';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/v2/index.css';

const ChatForum = ({ slug, clerkUser }) => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const apiKey = "wm2zeyzvf32c"; 
  const userId = clerkUser?.id;
  const userName = clerkUser?.name;
  const userToken = clerkUser?.token;

  useEffect(() => {
    if (!userId || !userToken) return;
  
    const initializeChat = async () => {
      const chatClient = StreamChat.getInstance(apiKey);
  
      try {
        await chatClient.connectUser(
          {
            id: userId,
            name: userName,
            image: `https://getstream.io/random_png/?name=${userName}`,
          },
          userToken
        );
  
        const channel = chatClient.channel('messaging', slug, {
          image: 'https://getstream.io/random_png/?name=react',
          name: slug,
       
        });
  
        // await channel.watch();
        setClient(chatClient);
        setChannel(channel);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
      }
    };
    initializeChat();
  }, [userId, userToken, slug]);

  if (!client || !channel) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatForum;

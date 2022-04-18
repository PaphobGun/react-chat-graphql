import React from 'react';

type UserId = 'Joyse' | 'Sam' | 'Russell';
type ChannelId = '1' | '2' | '3';

interface Channel {
  channelId: ChannelId,
  name: string
}

interface IUserChannelContext {
  userId: UserId;
  channel: Channel;
  setUserId: (_userId: UserId) => void;
  setChannel: (_channel: Channel) => void;
}

const UserChannelContext = React.createContext<IUserChannelContext | undefined>(undefined);
UserChannelContext.displayName = 'UserChannelContext';

function useUserChannel(): IUserChannelContext {
  const context = React.useContext(UserChannelContext);

  if (context === undefined) {
    throw new Error('useUserChannel must be used within UserChannelProvider')
  }

  return context;
}

interface IUserChannelProviderState {
  userId: UserId;
  channel: Channel;
}

function UserChannelProvider(props: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState<IUserChannelProviderState>({
    userId: 'Joyse',
    channel: {
      channelId: '1',
      name: 'General'
    }
  });
  const value: IUserChannelContext = {
    ...state,
    setUserId: (userId: UserId) => setState({
      ...state,
      userId
    }),
    setChannel: (channel: Channel) => setState({
      ...state,
      channel
    })
  }
  return <UserChannelContext.Provider value={value} {...props} />
}

export { useUserChannel,  UserChannelProvider}
export type { UserId, ChannelId, Channel }


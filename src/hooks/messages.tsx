import { gql, useQuery, useMutation, useLazyQuery, MutationHookOptions } from '@apollo/client';

import type { ChannelId } from '../context/user-channel-context';

interface Message {
  messageId: string;
  datetime: string;
  text: string;
  userId: string;
  isError?: boolean;
}

interface MessagesData {
  fetchLatestMessages: Message[];
}

interface FetchMessagesVars {
  channelId: ChannelId;
}

interface PostMessageData {
  postMssage: Partial<Message>
}

interface PostMessageVars {
  text: string;
  channelId: ChannelId;
  userId: string;
}

interface MoreMessagesData {
  fetchMoreMessages: Message[];
}

interface MoreMessagesVars {
  channelId: ChannelId;
  messageId: string;
  old: boolean;
}

const FETCH_LATEST_MESSAGES = gql`
  query FetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

function useMessages(channelId: ChannelId) {
  const result = useQuery<MessagesData, FetchMessagesVars>(FETCH_LATEST_MESSAGES, {
    variables: {
      channelId
    },
  })

  return result;
}

const FETCH_MORE_MESSAGES = gql`
  query FetchMoreMessages($channelId: String!, $messageId: String!, $old: Boolean!) {
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      text
      datetime
      userId
    }
  }
`;

function useMoreMessages() {
  const result = useLazyQuery<MoreMessagesData, MoreMessagesVars>(FETCH_MORE_MESSAGES);

  return result;
}

const POST_MESSAGE = gql`
  mutation postMessage($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      text
      userId
      datetime
    }
  }
`;

function usePostMessage(postMessageVars: PostMessageVars, options: MutationHookOptions = {}) {
  const result = useMutation<PostMessageData, PostMessageVars>(POST_MESSAGE, {
    ...options,
    variables: postMessageVars,
    refetchQueries: [
      FETCH_LATEST_MESSAGES
    ],
  });

  return result;
}

export { useMessages, usePostMessage, useMoreMessages, FETCH_LATEST_MESSAGES }
export type { Message, MoreMessagesVars }

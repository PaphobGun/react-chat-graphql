/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { RiSendPlaneFill } from 'react-icons/ri';

import { useUserChannel } from '../../context/user-channel-context'
import { useMessages, usePostMessage, useMoreMessages, FETCH_LATEST_MESSAGES } from '../../hooks/messages';
import type { Message, MoreMessagesVars } from '../../hooks/messages';
import { useLocalStorageState } from '../../hooks/local-storage';
import Button from '../../components/lib/button';
import Textarea from '../../components/lib/textarea';
import ChatItem from './chat-item';

export default function ChatPannel() {
  const [typingMessage, setTypingMessage] = useLocalStorageState('typingMessage', '');
  const [renderData, setRenderData] = React.useState<Message[]>([]);
  const [loadMoreId, setLoadMoreId] = React.useState<string | null>(null);

  const { channel, userId } = useUserChannel();
  const { data: messages, loading: loadingMessages, error: errorMessages } = useMessages(channel.channelId);
  const [postMessage, { client }] = usePostMessage({ channelId: channel?.channelId, userId, text: typingMessage }, {
    onError: (error) => {
      client.writeQuery({
        query: FETCH_LATEST_MESSAGES,
        data: { 
          fetchLatestMessages: [
            {
              __typename: 'Message',
              userId,
              text: typingMessage,
              datetime: Date.now(),
              messageId: `${Date.now()}-error`,
              isError: true
            },
            ...messages!!.fetchLatestMessages
          ]
        },
        variables: {
          channelId: channel?.channelId
        }
      });
      setTypingMessage('');
      return error;
    },
    update: () => setTypingMessage('')
  });
  const [fetchMoreMessages] = useMoreMessages();

  React.useEffect(() => {
    if (messages?.fetchLatestMessages?.length) {
      setRenderData(messages.fetchLatestMessages);
      setLoadMoreId(messages.fetchLatestMessages[0].messageId);
    } else {
      setRenderData([]);
    }
  }, [messages])

  const doFetchMoreMessages = async (vars: MoreMessagesVars, direction: string) => {
    if (!vars.messageId) {
      return;
    }

    const result = await fetchMoreMessages({
      variables: vars
    });

    const resultData = result.data ? [...result.data!!.fetchMoreMessages] : [];
    if (direction === 'next') {
      setLoadMoreId(resultData.length ? resultData[resultData.length - 1].messageId : null);
      if (resultData.length) {
        setRenderData(resultData.reverse());
      } else {
        setRenderData(messages!!.fetchLatestMessages);
      }
    } else {
      setLoadMoreId(resultData.length ? resultData[0].messageId : renderData[0].messageId);
      setRenderData(resultData);
    }
  }

  const onClickSendMessage = () => {
    if (!typingMessage) {
      return;
    }
    postMessage();
  }

  const renderMessages = (messages: Message[] = []) => {
    const _messages = [...messages];

    return _messages?.reverse()?.map(m => 
      <ChatItem 
        key={m.messageId}
        messageId={m.messageId}
        text={m.text}
        datetime={m.datetime}
        userId={m.userId}
      />
    );
  };

  return (
    <div>
      <div
        css={{
          width: '100%',
          padding: '0 15px',
          minHeight: 64,
          lineHeight: '64px',
          borderBottom: '1px solid #e6ecf3',
          borderRadius: '0 3px 0 0',
          boxSizing: 'border-box'
        }}
      >
        { channel.name } Channel
      </div>
      <div
        css={{
          padding: '1rem'
        }}
      >
        <div
          css={{
            marginBottom: 40
          }}
        >
          <Button
            onClick={() => doFetchMoreMessages({ channelId: channel?.channelId, messageId: renderData[renderData.length - 1].messageId, old: true }, 'prev')}
            disabled={renderData.length === 0}
          >
            <span css={{marginRight: 4}}>Read More</span> <FaArrowUp />
          </Button>
        </div>
        <div>
          {
            loadingMessages ? <div>Loading...</div> : errorMessages ?
            <div>Error! {errorMessages.message}</div> : renderMessages(renderData)
          }
        </div>
        <div>
          <Button
            onClick={() => doFetchMoreMessages({ channelId: channel?.channelId, messageId: loadMoreId!!, old: false }, 'next')}
          >
            <span css={{marginRight: 4}}>Read More</span> <FaArrowDown />
          </Button>
        </div>
        <div
          css={{
            marginTop: '1rem'
          }}
        >
          <Textarea
            onChange={e => setTypingMessage(e.target.value)}
            placeholder='Type your message here...'
            value={typingMessage}
          />
          <Button
            onClick={onClickSendMessage}
          >
            <span css={{marginRight: 4}}>Send Message</span> <RiSendPlaneFill />
          </Button>
        </div>
      </div>
    </div>
  )
}

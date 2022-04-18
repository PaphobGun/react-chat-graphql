/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import { useUserChannel } from '../../context/user-channel-context';
import { getHourAndMinutes } from '../../utils/formatter';
import * as colors from '../../styles/colors';

function getImgByUserId(userId: string) {
  switch (userId) {
    case 'Joyse':
      return 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/Joyse.png';
    case 'Sam':
      return 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/Sam.png';
    case 'Russell':
      return 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/Russell.png'
    default:
      return 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/Joyse.png'
  }
}

interface IChatItemProps {
  userId: string;
  messageId: string;
  datetime: string;
  text: string;
}

export default function ChatItem({ userId, messageId, datetime, text }: React.PropsWithChildren<IChatItemProps>) {

  const { userId: activeUserId } = useUserChannel();

  return (
    <li
      css={{
        marginBottom: 40,
        listStyle: 'none',
        display: 'flex',
        flexDirection: userId === activeUserId ? 'row-reverse' : 'row',
        flex: 1,
        justifyContent: userId === activeUserId ? 'flex-start' : 'unset'
      }}
    >
      <div
        css={{
          marginRight: userId === activeUserId ? 0 : 20,
          marginLeft: userId === activeUserId ? 20 : 0
        }}
      >
        <img 
          src={getImgByUserId(userId)}
          css={{
            width: 48,
            heigh: 48
          }}
          alt='Avatar'
        />
        <div
          css={{
            fontSize: '.75rem',
            color: '#999',
            textAlign: 'center'
          }}
        >
          {userId}
        </div>
      </div>
      <ChatText
        userId={userId}
        activeUserId={activeUserId}
      >
        {text}
      </ChatText>
      <div
        css={{
          padding: 0,
          margin: userId === activeUserId ? '0' : '0 0 0 10px',
          fontSize: '0.80rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {getHourAndMinutes(new Date(datetime))}
        {
          userId === activeUserId &&
          <React.Fragment>
              {
                messageId.split('-')[1] === 'error' ? 
                <RiErrorWarningFill
                  css={{
                    fill: '#B71E3D'
                  }}
                />
                : 
                <BsFillCheckCircleFill 
                  css={{
                    fill: '#9EC94A'
                  }}
                />
              }
            <span
              css={{
                fontSize: '.75rem',
                color: '#999',
                textAlign: 'center'
              }}
            >
              {messageId.split('-')[1] === 'error' ? 'Error' : 'Sent'}
            </span>
          </React.Fragment>
        }
      </div>
      <div>
      </div>
    </li>
  )
}

interface IChatTextProps {
  userId: string;
  activeUserId: string
}

const ChatText = styled.div<IChatTextProps>(({userId, activeUserId}) => (
  {
    padding: '0.4rem 1rem',
    maxWidth: 350,
    borderRadius: 4,
    background: colors.white,
    fontWeight: 300,
    lineHeight: '150%',
    boxSizing: 'border-box',
    position: 'relative',
    ':before': {
      content: '""',
      position: 'absolute',
      width: 0,
      height: 0,
      top: '10px',
      left: userId === activeUserId ? 'inherit' : '-20px',
      right: userId === activeUserId ? '-20px' : 'unset',
      border: '10px solid',
      borderColor: userId === activeUserId ? `transparent transparent transparent ${colors.white}` : `transparent ${colors.white} transparent transparent`
    }
  })
);



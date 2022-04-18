/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';

import * as colors from '../../styles/colors';
import UserChannel from './user-channel';
import ChatPannel from './chat-pannel';

export default function ChatRoom() {

  return (
    <div css={{
      backgroundColor: colors.bgPrimary,
      display: 'flex',
      flexWrap: 'wrap'
    }}>
      <div css={{
        flex: '0 0 33.333333%',
        maxWidth: '33.333333%',
        borderRight: '1px solid #e6ecf3',
        boxSizing: 'border-box'
      }}>
        <UserChannel />
      </div>
      <div css={{
        flex: '0 0 66.666667%',
        maxWidth: '66.666667%'
      }}>
        <ChatPannel />
      </div>
    </div>
  )
}

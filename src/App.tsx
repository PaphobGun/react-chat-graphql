/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react';

import Info from './components/info';
import ChatRoom from './components/chat-room';
import * as mq from './styles/media-queries';

function App() {
  return (
    <div
      css={{
        [mq.sm]: {
          maxWidth: 540
        },
        [mq.md]: {
          maxWidth: 720
        },
        [mq.lg]: {
          maxWidth: 960
        },
        [mq.xl]: {
          maxWidth: 1140
        },
        margin: '0 auto',
        paddingTop: 20
      }}
    >
      <Info />
      <div css={{
        marginTop: 16
      }}>
        <ChatRoom />
      </div>
    </div>
  );
}

export default App;

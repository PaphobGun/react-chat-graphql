/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react'
import { useUserChannel } from '../../context/user-channel-context';
import type { UserId, Channel } from '../../context/user-channel-context';
import { useMessages } from '../../hooks/messages';
import Select from '../lib/select';
import * as colors from '../../styles/colors';

const userIdOptions: UserId[] = ['Joyse', 'Sam', 'Russell'];
const channels: Channel[] = [
  {
    channelId: '1',
    name: 'General'
  },
  {
    channelId: '2',
    name: 'Technology'
  },
  {
    channelId: '3',
    name: 'LGTM'
  }
]

export default function UserChannel() {
  const {userId, setUserId, channel, setChannel} = useUserChannel();
  const { refetch } = useMessages(channel.channelId);

  const onChangeUserId = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value as UserId);

  const onChangeChannel = (_channel: Channel) => { 
    setChannel(_channel); 
    refetch({
      channelId: _channel.channelId
    });
  }

  return (
    <div>
      <div css={{
        paddingTop: 16
      }}>
        <label
          css={{
            color: colors.primaryText,
            display: 'inline-block',
            marginBottom: '0.5rem'
          }}
        >
          1. Choose your user
        </label>
        <Select
          value={userId}
          onChange={onChangeUserId}
        >
          {userIdOptions.map(u =>
          <option key={u} value={u}>
            {u}
          </option>)}
        </Select>
      </div>
      <div
        css={{
          paddingTop: 16
        }}
      >
        <p>
          2. Choose your Channel
        </p>
        <ul
          css={{
            listStyle: 'none',
            padding: 0
          }}
        >
          {channels.map(c =>
          <li
            key={c.channelId}
            css={{
              fontWeight: 600,
              fontSize: '.85rem',
              padding: '10px 1rem',
              cursor: 'pointer',
              backgroundColor: channel.channelId === c.channelId ? colors.white : 'unset',
              backgroundImage: channel.channelId === c.channelId ? `linear-gradient(right, #f7f9fb, ${colors.white})` : 'unset',
              ':hover': {
                backgroundColor: colors.white,
                backgroundImage: `linear-gradient(right, #e9eff5, ${colors.white})`
              }
            }}
            onClick={() => onChangeChannel(c)}
          >
            <p
              css={{
                paddingBottom: 16
              }}
            >
              {c.name} Channel
            </p>
          </li>)}
        </ul>
      </div>
    </div>
  )
}

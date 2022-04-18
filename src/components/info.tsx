/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import * as colors from '../styles/colors';

export default function info() {
  return (
    <div css={{
      color: colors.primaryText
    }}>
      <h5 css={{
        fontSize: '1.25rem',
        fontWeight: 500,
        marginBottom: '0.5rem'
      }}>
        1 day chat App
      </h5>
      <p>
        All messages will be deleted at every 00:00 UTC
      </p>
    </div>
  )
}

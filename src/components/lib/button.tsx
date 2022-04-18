import styled from '@emotion/styled';

import * as colors from '../../styles/colors';

export default styled.button({
  backgroundColor: colors.skyBlue,
  border: `1px solid ${colors.skyBlue}`,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  color: colors.white,
  textAlign: 'center',
  verticalAlign: 'middle',
  userSelect: 'none',
  padding: '0.375rem 0.75rem',
  fontSize: '1rem',
  lineHeight: '1.5',
  borderRadius: '0.25rem',
  transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#138496',
    borderColor: '#117a8b'
  },
  ':not(disabled)': {
    ':active': {
      backgroundColor: '#117a8b',
      borderColor: '#10707f'
    }
  },
  ':disabled': {
    opacity: .65
  }
})

import styled from '@emotion/styled';

import * as colors from '../../styles/colors';

export default styled.textarea({
  display: 'block',
  width: '100%',
  height: 86,
  padding: '0.375rem 0.75rem',
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.5,
  fontFamily: 'inherit',
  color: colors.secondaryText,
  backgroundColor: colors.white,
  boxSizing: 'border-box',
  border: `1px solid ${colors.borderGrey}`,
  borderRadius: '0.25rem',
  transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
  ':focus': {
    borderColor: '#80bdff',
    outline: 0,
    boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)'
  }
});
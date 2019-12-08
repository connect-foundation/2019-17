import { DefaultTheme, css } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    facebookBlue: '#4267B2',
    bgColor: '#EAEBEE',
    white: '#FFFFFF',
    facebookTextColor: '#4B4F56',
    fontMainBlue: '#385898',
    fontButtonGray: '#606770',
    borderColor: '#dddfe2',
    textColor: '#4b4f56'
  },
  borders: {
    borderStyle: '1px solid #ccd0d5',
    radius: '5px',
    feedBorder: css`
      border: 1px solid #dddfe2;
      border-radius: 3px;
    `
  },
  alarmWidth: '430px',
  alarmHeight: '550px'
};

export default theme;

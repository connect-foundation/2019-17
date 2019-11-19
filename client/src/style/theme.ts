import { DefaultTheme, css } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    facebookBlue: "#4267B2",
    fontMainBlue: "#385898",
    fontButtonGray: "#606770"
  },
  borders: {
    feedBorder: css`
      border: 1px solid #dddfe2;
      border-radius: 3px;
    `
  }
};

export default theme;

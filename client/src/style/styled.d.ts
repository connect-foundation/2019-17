import "styled-components";
import { FlattenInterpolation } from "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      facebookBlue: string;
      bgColor: string;
      white: string;
      facebookTextColor: string;
      borderColor: string;
      textColor: string;
      fontMainBlue: string;
      fontButtonGray: string;
      messageBgBlue: string;
    };
    borders: {
      borderStyle: string;
      radius: string;
      feedBorder: FlattenInterpolation;
    };
    alarmWidth: string;
    alarmHeight: string;
  }
}

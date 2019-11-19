import "styled-components";
import { FlattenInterpolation } from "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      facebookBlue: string;
      borderColor: string;
      textColor: string;
      fontMainBlue: string;
      fontButtonGray: string;
    };
    borders: {
      radius: string;
      feedBorder: FlattenInterpolation;
    };
  }
}

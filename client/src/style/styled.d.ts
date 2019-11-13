import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      facebookBlue: string;
      bgColor: string;
      white: string;
      facebookTextColor: string;
      borderColor: string;
    };

    borders: {
      radius: string;
    };
  }
}
